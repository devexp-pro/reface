import type { Layout } from "../layouts/mod.ts";
import type { RefaceOptions, RouteHandler } from "./types.ts";
import { render } from "@reface/html";
import { type Context, Hono } from "@hono/hono";

export class Reface {
  private layout: Layout;
  private pages: Record<string, RouteHandler> = {};

  constructor(private options: RefaceOptions) {
    this.layout = options.layout;
  }

  /**
   * Add page route
   */
  page(route: string, handler: RouteHandler): Reface {
    this.pages[route] = handler;
    return this;
  }

  /**
   * Convert to Hono middleware
   */
  hono(): Hono {
    const app = new Hono();

    // Add routes
    Object.entries(this.pages).forEach(([route, handler]) => {
      app.get(route, async (c: Context) => {
        const template = await handler({
          route,
          params: c.req.param(),
          query: c.req.query(),
          headers: c.req.header(),
        });

        const html = render(template);
        return c.html(this.layout(html));
      });
    });

    return app;
  }
}
