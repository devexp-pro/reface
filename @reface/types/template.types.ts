import type { ElementChildType } from "./base.types.ts";
import type { IRefaceRenderManager } from "./composer.types.ts";
import type { HTMLAttributes } from "./html.types.ts";

export interface ITemplateData<
  A extends HTMLAttributes = HTMLAttributes,
  P extends Record<string, unknown> = Record<string, unknown>,
> {
  type: string;
  children?: ElementChildType[];
  attributes?: A;
  payload?: P;
  tag?: string;
}

export interface IRefaceTemplate<
  A extends HTMLAttributes = HTMLAttributes,
  P extends Record<string, unknown> = Record<string, unknown>,
> extends ITemplateData<A, P> {
  (attributes: A): void;
  (strings: TemplateStringsArray, ...values: any[]): void;
  toHtml(manager: IRefaceRenderManager): string;
}
