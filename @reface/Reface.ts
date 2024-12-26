import { type Context, Hono, type HonoRequest } from "@hono/hono";
import type { IRefaceComposerPlugin } from "@reface/types";
import type { Template, TemplateAttributes } from "@reface/template";

import { RefaceComposer } from "./RefaceComposer.ts";
import {
  createPartial,
  type PartialHandler,
  PartialsPlugin,
} from "./plugins/partials/mod.ts";
import { StyledPlugin } from "./plugins/styled/mod.ts";
import {
  createIsland,
  createIslandComponent,
  type Island,
  type IslandPayload,
  IslandPlugin,
  type RpcResponse,
} from "./island/mod.ts";

export interface RefaceOptions {
  plugins?: IRefaceComposerPlugin[];
  layout?: Template;
  partialApiPrefix?: string;
}

const PARTIAL_API_PREFIX = "/reface/partial";

export class Reface {
  private composer: RefaceComposer;
  private islandPlugin: IslandPlugin;
  private partialsPlugin: PartialsPlugin;
  private layout?: Template;
  private islands = new Map<string, Island<any, any, any>>();
  private islandProps = new Map<string, unknown>();

  static partial<T extends Template = Template>(
    handler: PartialHandler<HonoRequest, T>,
    name: string,
  ): T {
    return createPartial(handler, name, PARTIAL_API_PREFIX) as T;
  }

  constructor(options: RefaceOptions = {}) {
    this.composer = new RefaceComposer();
    this.layout = options.layout;

    this.islandPlugin = new IslandPlugin();
    this.partialsPlugin = new PartialsPlugin({
      apiPrefix: PARTIAL_API_PREFIX,
    });

    this.composer.use(this.islandPlugin);
    this.composer.use(this.partialsPlugin);
    this.composer.use(new StyledPlugin());

    options.plugins?.forEach((plugin) => this.composer.use(plugin));
  }

  private async handlePartial(c: Context): Promise<Response> {
    const partialName = c.req.param("partial");

    try {
      const handler = this.partialsPlugin.getHandler(partialName);
      if (!handler) {
        return c.text("Partial not found", 404);
      }

      const template = await handler();
      const content = this.composer.render(template as Template);

      return c.html(content);
    } catch (error) {
      console.error(`Error rendering partial ${partialName}:`, error);
      return c.text("Internal server error", 500);
    }
  }

  hono(): Hono {
    const router = new Hono();

    router.get(`${PARTIAL_API_PREFIX}/:partial`, (c) => this.handlePartial(c));

    router.post("/rpc/:island/:method", async (c) => {
      const { island, method } = c.req.param();
      let args;
      const contentType = c.req.header("content-type");

      if (contentType?.includes("application/json")) {
        args = await c.req.json();
      } else {
        const formData = await c.req.formData();
        args = Object.fromEntries(formData.entries());
      }

      const response = await this.handleRpc(island, method, args);
      return c.html(response.html || "", { status: response.status });
    });

    return router;
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

    const component = createIslandComponent(islandConfig, this.islandPlugin);
    this.islands.set(islandConfig.name, islandConfig);
    return component;
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
        const newState = {
          ...state,
          ...response.state,
        };
        this.islandPlugin.setIslandState(islandName, newState);
        const rpc = this.islandPlugin.createRpcProxy(islandName);
        const props = this.islandProps.get(islandName) || {};
        const context = {
          props,
          state: newState,
          rpc,
        };
        const template = createIsland(
          islandName,
          island.template(context),
          newState,
        );
        response.html = this.composer.render(template);
      }

      return {
        html: response.html,
        state: response.state,
        status: response.status || 200,
      };
    } catch (e) {
      const error = e as Error;
      console.error(`RPC Error:`, error);
      return {
        html: `<div class="error">${error?.message || "Unknown error"}</div>`,
        status: 500,
      };
    }
  }
  cleanup(islandName: string): void {
    this.islands.delete(islandName);
    this.islandProps.delete(islandName);
    this.islandPlugin.clearIslandState(islandName);
  }
  render(template: Template): string {
    let content = template;
    if (this.layout) {
      content = this.layout`${content}`;
    }
    try {
      return this.composer.render(content);
    } catch (e) {
      const error = e as Error;
      console.error(`Render Error:`, error);
      return `<div class="error">Render Error: ${
        error?.message || "Unknown error"
      }</div>`;
    }
  }
  getComposer(): RefaceComposer {
    return this.composer;
  }
}
