import type { Context, Hono } from "@hono/hono";
import type { ContentfulStatusCode } from "@hono/hono/utils/http-status";
import { Recast } from "@recast/recast";
import { RecastStyledPlugin } from "@recast/styled";
import { SlotsPlugin } from "@recast/slots";
import type { Element } from "@recast/expressions";

import { partial, type PartialHandler } from "./partials/mod.ts";
import { PartialsPlugin } from "./partials/PartialsPlugin.ts";
import { IslandPlugin } from "./island/IslandPlugin.ts";
import { createErrorView } from "./errorScreen/mod.ts";
import type { Island, IslandPayload, RpcResponse } from "./island/types.ts";

export interface RefaceOptions {
  plugins?: Array<typeof StyledPlugin | typeof SlotsPlugin>;
  layout?: Element;
  partialApiPrefix?: string;
}

const PARTIAL_API_PREFIX = "/reface/partial";

export class Reface {
  private recast: Recast;
  private islandPlugin: IslandPlugin;
  private partialsPlugin: PartialsPlugin;
  private layout?: Element;
  private islands = new Map<string, Island<any, any, any>>();
  private islandProps = new Map<string, unknown>();

  static partial(
    handler: PartialHandler<any>,
    name: string,
  ): Element<any, any> {
    return partial(handler, name) as Element<any, any>;
  }

  constructor(options: RefaceOptions = {}) {
    this.recast = new Recast();
    this.layout = options.layout;

    this.islandPlugin = new IslandPlugin();
    this.partialsPlugin = new PartialsPlugin({
      apiPrefix: options.partialApiPrefix || PARTIAL_API_PREFIX,
    });

    this.recast.use(this.islandPlugin);
    this.recast.use(this.partialsPlugin);
    this.recast.use(new RecastStyledPlugin());
    this.recast.use(new SlotsPlugin());

    options.plugins?.forEach((Plugin) => this.recast.use(new Plugin()));
  }

  private async handlePartial(c: Context): Promise<Response> {
    const partialName = c.req.param("partial");

    try {
      const handler = this.partialsPlugin.getHandler(partialName);
      if (!handler) {
        return c.text("Partial not found", 404);
      }

      const template = await handler(c);
      const content = this.recast.render(template as Element);

      return c.html(content);
    } catch (error) {
      console.error(`Error rendering partial ${partialName}:`, error);
      return c.text("Internal server error", 500);
    }
  }

  hono(hono: Hono): Hono<any, any, any> {
    hono.onError((err, c) => {
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

    hono.use("*", async (c, next) => {
      try {
        return await next();
      } catch (e) {
        console.error("Middleware Error Handler:", e);
        throw e;
      }
    });

    hono.get(`${PARTIAL_API_PREFIX}/:partial`, (c) => this.handlePartial(c));
    hono.post("/rpc/:island/:method", async (c) => {
      const { island, method } = c.req.param();
      const args = c.req.header("content-type")?.includes("application/json")
        ? await c.req.json()
        : Object.fromEntries((await c.req.formData()).entries());

      const response = await this.handleRpc(island, method, args);
      return c.html(response.html || "", {
        status: response.status as ContentfulStatusCode,
      });
    });

    return hono;
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

  async render(template: Template): Promise<string> {
    let content = template;
    if (this.layout) {
      content = this.layout`${content}`;
    }

    try {
      const result = await this.recast.render(content);
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

  getRecast(): Recast {
    return this.recast;
  }
}
