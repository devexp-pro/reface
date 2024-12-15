// @reface/Reface.ts
import { RefaceComposer } from "./RefaceComposer.ts";
import { PartialsPlugin } from "./plugins/partials/mod.ts";
import { StyledPlugin } from "./plugins/styled/mod.ts";
import {
  type Island,
  IslandPlugin,
  type RpcResponse,
  TemplateIsland,
} from "./island/mod.ts";
import type { IPlugin } from "./RefaceComposer.ts";
import type { Template } from "./core/types.ts";
import { Hono } from "@hono/hono";
import type { Context } from "@hono/hono";

export interface RefaceOptions {
  plugins?: IPlugin[];
  layout?: (props: unknown, content: Template) => Template;
  partialApiPrefix?: string;
}

export class Reface {
  private composer: RefaceComposer;
  private islandPlugin: IslandPlugin;
  private partialsPlugin: PartialsPlugin;
  private layout?: (props: unknown, content: Template) => Template;
  private islands = new Map<string, Island<any, any, any>>();
  private islandProps = new Map<string, unknown>();
  private PARTIAL_API_PREFIX: string;

  constructor(options: RefaceOptions = {}) {
    this.composer = new RefaceComposer();
    this.layout = options.layout;
    this.PARTIAL_API_PREFIX = options.partialApiPrefix || "/_partial";

    this.islandPlugin = new IslandPlugin();
    this.partialsPlugin = new PartialsPlugin();

    this.composer.use(this.islandPlugin);
    this.composer.use(this.partialsPlugin);
    this.composer.use(new StyledPlugin());

    options.plugins?.forEach((plugin) => this.composer.use(plugin));
  }

  // Обработка partial запроса
  private async handlePartial(c: Context): Promise<Response> {
    const partialName = c.req.param("partial");

    try {
      const handler = this.partialsPlugin.getHandler(partialName);
      if (!handler) {
        return c.text("Partial not found", 404);
      }

      const template = await handler(c);
      const content = this.composer.render(template);

      return c.html(content);
    } catch (error) {
      console.error(`Error rendering partial ${partialName}:`, error);
      return c.text("Internal server error", 500);
    }
  }

  // Получение Hono роутера
  hono(): Hono {
    const router = new Hono();

    // Роут для partial
    router.get(
      `${this.PARTIAL_API_PREFIX}/:partial`,
      (c) => this.handlePartial(c),
    );

    // Роут для RPC
    router.post("/rpc/:island/:method", async (c) => {
      const { island, method } = c.req.param();

      // Получаем данные из формы или JSON
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

  // Создание острова
  island<State, Props, RPC>(island: Island<State, Props, RPC>) {
    const name = island.name || `island-${crypto.randomUUID()}`;

    this.islands.set(name, island);

    if (island.initialState) {
      this.islandPlugin.setIslandState(name, island.initialState);
    }

    return (props: Props): Template => {
      this.islandProps.set(name, props);

      const state = this.islandPlugin.getIslandState<State>(name) ||
        island.initialState;
      const rpc = this.islandPlugin.createRpcProxy<RPC>(name);

      const context = {
        props,
        state: state as State,
        rpc,
      };

      return TemplateIsland.create(
        name,
        island.template(context),
        state,
        island.rpc,
      );
    };
  }

  // Обработка RPC вызова
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

      // Обновляем состояние и HTML только если есть изменения в состоянии
      if (response.state) {
        const newState = {
          ...state,
          ...response.state,
        };
        this.islandPlugin.setIslandState(islandName, newState);

        // Создаем новый контекст
        const rpc = this.islandPlugin.createRpcProxy(islandName);
        const props = this.islandProps.get(islandName) || {};
        const context = {
          props,
          state: newState,
          rpc,
        };

        // Рендерим новый HTML
        const template = TemplateIsland.create(
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
    } catch (error) {
      console.error(`RPC Error:`, error);
      return {
        html: `<div class="error">${error.message}</div>`,
        status: 500,
      };
    }
  }

  // Очистка ресурсов острова
  cleanup(islandName: string): void {
    this.islands.delete(islandName);
    this.islandProps.delete(islandName);
    this.islandPlugin.clearIslandState(islandName);
  }

  // Рендеринг шаблона
  render(template: Template): string {
    let content = template;

    // Если есть layout - оборачиваем контент
    if (this.layout) {
      content = this.layout({}, content);
    }

    // Рендерим финальный шаблон через композер
    try {
      return this.composer.render(content);
    } catch (error) {
      console.error(`Render Error:`, error);
      return `<div class="error">Render Error: ${error.message}</div>`;
    }
  }

  // Получение композера (для плагинов)
  getComposer(): RefaceComposer {
    return this.composer;
  }
}
