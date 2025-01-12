import { type Context, Hono } from "@hono/hono";
import type { ContentfulStatusCode } from "@hono/hono/utils/http-status";
import {
  componentExpression,
  type Element,
  Recast,
  RecastStyledPlugin,
  SlotsPlugin,
} from "@recast";
import { partial, type PartialHandler } from "../partials/mod.ts";
import { PartialsPlugin } from "../partials/PartialsPlugin.ts";
import { IslandPlugin } from "../island/mod.ts";
import { createErrorView } from "../errorScreen/mod.ts";
import type { Island, IslandPayload, RpcResponse } from "../island/types.ts";
import type { Child } from "@recast";
import type { RefaceLayout, RefaceOptions } from "./types.ts";
import { island } from "../island/island.ts";
import { LayoutSimple } from "@reface-ui";
import { recastMiddleware } from "../hono/recastMiddleware.ts";

const PARTIAL_API_PREFIX = "/reface/partial";

export class Reface {
  private static instance: Reface;
  public readonly recast: Recast;
  private islandPlugin: IslandPlugin;
  private partialsPlugin: PartialsPlugin;
  private layout?: RefaceLayout;
  private islands = new Map<string, Island<any, any, any>>();
  private islandProps = new Map<string, unknown>();
  public router: Hono;
  public fetch: Fetch;

  private constructor({
    layout = LayoutSimple,
    plugins = [],
    partialApiPrefix = PARTIAL_API_PREFIX,
  }: RefaceOptions) {
    this.recast = new Recast();
    this.router = new Hono();
    this.layout = layout;
    this.fetch = this.router.fetch;

    this.islandPlugin = new IslandPlugin();
    this.partialsPlugin = new PartialsPlugin({
      apiPrefix: partialApiPrefix,
    });

    this.recast.use([
      new RecastStyledPlugin(),
      new SlotsPlugin(),
      this.islandPlugin,
      this.partialsPlugin,
      ...plugins,
    ]);

    this.initRouter();
  }

  static setup(options: RefaceOptions = {}): Reface {
    if (!Reface.instance) {
      Reface.instance = new Reface(options);
      return Reface.instance;
    }
    throw new Error("Reface already initialized");
  }

  static getReface(): Reface {
    if (!Reface.instance) {
      throw new Error("Reface not initialized. Call init() first.");
    }
    return Reface.instance;
  }
  static get reface(): Reface {
    return Reface.getReface();
  }

  private async handlePartial(c: Context): Promise<Response> {
    const partialName = c.req.param("partial");

    try {
      const handler = this.partialsPlugin.getHandler(partialName);
      if (!handler) {
        return c.text("Partial not found", 404);
      }

      const template = await handler(c);
      const content = this.recast.renderHtml(template as Element);

      return c.html(content);
    } catch (error) {
      console.error(`Error rendering partial ${partialName}:`, error);
      return c.text("Internal server error", 500);
    }
  }

  island<
    State,
    Props,
    RPC extends Record<
      string,
      (args: { state: State; args: unknown }) => Promise<{
        state?: Partial<State>;
        html?: string;
        status?: number;
      }>
    >,
  >(
    islandConfig: Island<State, Props, RPC>,
  ): (props: Props) => Template<TemplateAttributes, IslandPayload> {
    if (!islandConfig.name) {
      throw new Error("Island must have a name");
    }

    const component = island(islandConfig, this.islandPlugin);
    this.islands.set(islandConfig.name, islandConfig);
    return component;
  }

  private initRouter(): void {
    this.router.onError((err, c) => {
      console.error("Hono Error Handler:", err);
      const title = err instanceof TypeError
        ? "Type Error"
        : err instanceof SyntaxError
        ? "Syntax Error"
        : err instanceof ReferenceError
        ? "Reference Error"
        : "Runtime Error";

      const errorHtml = createErrorView({
        error: err,
        title: title,
      });
      return c.html(errorHtml, 500);
    });

    this.router.use("*", recastMiddleware());

    this.router.use("*", async (c, next) => {
      try {
        return await next();
      } catch (e) {
        console.error("Middleware Error Handler:", e);
        throw e;
      }
    });

    this.router.get(
      `${PARTIAL_API_PREFIX}/:partial`,
      (c) => this.handlePartial(c),
    );
    this.router.post("/rpc/:island/:method", async (c) => {
      const { island, method } = c.req.param();
      const args = c.req.header("content-type")?.includes("application/json")
        ? await c.req.json()
        : Object.fromEntries((await c.req.formData()).entries());

      const response = await this.handleRpc(island, method, args);
      return c.html(response.html || "", {
        status: response.status as ContentfulStatusCode,
      });
    });
  }

  async handleRpc(
    islandName: string,
    method: string,
    args: unknown,
  ): Promise<RpcResponse> {
    try {
      const island = this.islands.get(islandName);
      if (!island) {
        throw new Error(`Island "${islandName}" not found`);
      }

      const state = this.islandPlugin.getIslandState(islandName);
      if (!state) {
        throw new Error(`State for island "${islandName}" not found`);
      }

      const rpcMethod = island.rpc?.[method];
      if (!rpcMethod) {
        throw new Error(
          `RPC method "${method}" not found in island "${islandName}"`,
        );
      }

      const response = await rpcMethod({ state, args });

      if (response.state) {
        const newState = { ...state, ...response.state };
        this.islandPlugin.setIslandState(islandName, newState);

        const rpc = this.islandPlugin.createRpcProxy(islandName);
        const props = this.islandProps.get(islandName) || {};
        const context = { props, state: newState, rpc };

        const template = island.template(context);
        response.html = this.recast.render(template);
      }

      return {
        html: response.html,
        state: response.state,
        status: response.status || 200,
      };
    } catch (e) {
      console.error(`RPC Error:`, e);
      return {
        html: `<div class="error">${e?.message || "Unknown error"}</div>`,
        status: 500,
      };
    }
  }

  cleanup(islandName: string): void {
    this.islands.delete(islandName);
    this.islandProps.delete(islandName);
    this.islandPlugin.clearIslandState(islandName);
  }

  async render(
    template: Child | Child[],
    userOptions?: Record<string, any>,
  ): Promise<string> {
    let content = template;
    if (componentExpression.is(this.layout)) {
      content = this.layout`${content}`;
    }

    try {
      const result = await this.recast.render(content, {
        ...userOptions,
        reface: {
          islandPlugin: this.islandPlugin,
        },
      });
      if (
        typeof this.layout === "function" &&
        !componentExpression.is(this.layout)
      ) {
        return this.layout(result);
      }
      return result.html;
    } catch (e) {
      console.error(`Render Error:`, e);
      try {
        return createErrorView({
          error: e as Error,
          title: "Template Render Error",
        });
      } catch (errorViewError) {
        console.error("Error in error view:", errorViewError);
        throw e;
      }
    }
  }
}
