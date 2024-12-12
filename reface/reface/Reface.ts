import { type Context, Hono } from "hono";
import type { Layout } from "../layouts/mod.ts";
import type { Template } from "@reface/html";
import type { PagePropsType } from "./types.ts";
import { createLogger } from "@reface/core";
import { createIslandHandler } from "@reface/island";
import { render } from "@reface/html";

const logger = createLogger("Reface");

export class Reface {
  private layout: Layout;
  private pages: Record<string, any> = {};
  private islands: Map<string, () => Template> = new Map();

  constructor(private options: { layout: Layout }) {
    this.layout = options.layout;
  }

  page(route: string, generate: (props: PagePropsType) => Template): Reface {
    this.pages[route] = async (c: Context) => {
      const template = generate({
        route,
        params: c.req.param(),
        query: c.req.query(),
        headers: c.req.header(),
      });

      const { html, styles, islands } = render(template, true);

      for (const [islandName, generator] of islands.entries()) {
        this.islands.set(islandName, generator);
        logger.debug(`Registered island "${islandName}" with generator`);
      }

      const layoutHtml = this.layout(html + `<style>\n${styles}\n</style>`);
      return c.html(layoutHtml);
    };

    return this;
  }

  hono() {
    const router = new Hono();

    // Регистрируем маршруты страниц
    for (const [route, handler] of Object.entries(this.pages)) {
      router.get(route, handler);
    }

    // Добавляем обработчик для островов
    router.route("/", createIslandHandler(this.islands));

    return router;
  }
}
