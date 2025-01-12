import type { AsyncNode } from "@recast";

export interface MetaPartial {
  /** Уникальное имя partial */
  name: string;
  /** Обработчик partial запроса */
  handler: any;
  /** Префикс API пути */
  apiPrefix: string;
}

export interface PartialsPluginOptions {
  apiPrefix?: string;
}

export interface PartialMethods {
  trigger(): Record<string, string>;
}
