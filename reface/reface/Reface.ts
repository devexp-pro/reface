import { type Context, Hono } from "hono";
import type { Layout } from "../layouts/mod.ts";
import type { Template } from "@reface/html";
import type { PagePropsType } from "./types.ts";
import { RenderContextManager } from "../html/context.ts";
import { createLogger } from "@reface/core";
import { API_PATH } from "@reface/island";

const logger = createLogger("Reface");

function render(template: Template) {
  const context = RenderContextManager.createContext();
  if (typeof template === "string") {
    return {
      html: template,
      islands: new Map(),
      styles: "",
    };
  }

  try {
    const html = template.toHtml(context);
    const styles = Array.from(context.styles).join("\n");
    const islands = context.islands;

    return {
      html,
      islands,
      styles,
    };
  } finally {
    RenderContextManager.reset();
  }
}

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

      const { html, styles, islands } = render(template);

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
    router.get(`${API_PATH}/:name`, async (c) => {
      const name = c.req.param("name");
      if (!name) {
        return c.text("Island name is required", 400);
      }

      // Проверяем регистрацию острова
      if (!this.islands.has(name)) {
        logger.warn(`Island "${name}" not found`);
        return c.text(`Island "${name}" not found`, 404);
      }

      // Получаем и вызываем генератор острова
      const generator = this.islands.get(name);
      if (!generator) {
        logger.error(`Generator for island "${name}" not found`);
        return c.text(`Island "${name}" generator not found`, 500);
      }

      console.log(c);
      const result = await generator(c);

      return c.html(render(result).html, {
        status: 200,
      });
    });

    return router;
  }
}
