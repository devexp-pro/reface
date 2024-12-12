import { type Context, Hono } from "hono";
import { createLogger } from "@reface/core";
import { render, type TemplateBase } from "@reface/html";
import { ISLAND_API_PREFIX } from "./constants.ts";

const logger = createLogger("Island:Hono");

export function createIslandHandler(
  islands: Map<string, () => Promise<TemplateBase>>,
) {
  const router = new Hono();

  router.get(`${ISLAND_API_PREFIX}/:name`, async (c: Context) => {
    const name = c.req.param("name");
    if (!name) {
      return c.text("Island name is required", 400);
    }

    // Проверяем регистрацию острова
    if (!islands.has(name)) {
      logger.warn(`Island "${name}" not found`);
      return c.text(`Island "${name}" not found`, 404);
    }

    // Получаем и вызываем генератор острова
    const generator = islands.get(name);
    if (!generator) {
      logger.error(`Generator for island "${name}" not found`);
      return c.text(`Island "${name}" generator not found`, 500);
    }

    const result = await generator(c);

    return c.html(render(result, true).html, {
      status: 200,
    });
  });

  return router;
}
