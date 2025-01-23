import type { Context, Hono, HonoRequest } from "@hono/hono";

import {
  type Child,
  type ComponentNode,
  type Element,
  Recast,
  type RecastPluginInterface,
  RecastStyledPlugin,
} from "@recast";
import {
  partial,
  type PartialHandler,
  PartialsPlugin,
} from "./partials/mod.ts";
import { createErrorView } from "./errorScreen/mod.ts";

export interface RefaceOptions {
  plugins?: RecastPluginInterface[];
  layout?: Element;
  partialApiPrefix?: string;
}

const PARTIAL_API_PREFIX = "/reface/partial";

export class Reface {
  public static reface: Reface;
  public recast: Recast;
  private partialsPlugin: PartialsPlugin;
  private layout?: Element;

  static partial(
    handler: PartialHandler,
    name: string,
  ): ComponentNode<any, any> {
    return partial(handler, name) as ComponentNode<any, any>;
  }

  constructor(options: RefaceOptions = {}) {
    Reface.reface = this;
    this.recast = new Recast();
    this.layout = options.layout;

    this.partialsPlugin = new PartialsPlugin({
      apiPrefix: PARTIAL_API_PREFIX,
    });

    this.recast.use(this.partialsPlugin);
    this.recast.use(new RecastStyledPlugin());

    options.plugins?.forEach((plugin) => this.recast.use(plugin));
  }

  private async handlePartial(c: Context): Promise<Response> {
    const partialName = c.req.param("partial");

    try {
      const handler = this.partialsPlugin.getHandler(partialName);
      if (!handler) {
        return c.text("Partial not found", 404);
      }

      const template = await handler(c);
      const content = await this.recast.renderHtml(template as Child);

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

    hono.use("*", async (_, next) => {
      try {
        return await next();
      } catch (e) {
        const error = e as Error;
        console.error("Middleware Error Handler:", error);
        throw error;
      }
    });

    hono.get(`${PARTIAL_API_PREFIX}/:partial`, (c) => this.handlePartial(c));

    return hono;
  }
  async render(template: Child): Promise<string> {
    let content = template;
    if (this.layout) {
      content = this.layout`${content}`;
    }
    try {
      return await this.recast.renderHtml(content);
    } catch (e) {
      const error = e as Error;
      console.error(`Render Error:`, error);
      try {
        return createErrorView({
          error,
          title: "Template Render Error",
        });
      } catch (errorViewError) {
        console.error("Error in error view:", errorViewError);
        throw error;
      }
    }
  }
  getRecast(): Recast {
    return this.recast;
  }
}
