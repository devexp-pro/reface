import type { Context, MiddlewareHandler } from "@hono/hono";
import { Reface } from "../Reface/Reface.ts";
import {
  componentExpression,
  elementExpression,
  fragmentExpression,
} from "@recast";
import "./types.ts";

export function recastMiddleware(): MiddlewareHandler {
  return async (c: Context, next) => {
    c.setRenderer(async (content: any): Promise<any> => {
      if (
        componentExpression.is(content) ||
        elementExpression.is(content) ||
        fragmentExpression.is(content)
      ) {
        const reface = Reface.getReface();
        const html = await reface.render(content, { router: c });
        return c.html(html);
      }
    });

    await next();
  };
}
