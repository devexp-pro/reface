import type { Context } from "@hono/hono";
import type { Child, Children } from "@recast/expressions/mod.ts";

export type PartialHandler = (context: Context) => Children | Child;

export interface MetaPartial {
  /** Уникальное имя partial */
  name: string;
  /** Обработчик partial запроса */
  handler: PartialHandler;
  /** Префикс API пути */
  apiPrefix: string;
}

export interface PartialsPluginOptions {
  apiPrefix?: string;
}

export interface PartialMethods {
  trigger(): Record<string, string>;
}
