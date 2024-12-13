import { IRenderManager } from "../render/types.ts";

export interface ITemplate {
  children?: ElementChildType[];
  toHtml(manager: IRenderManager): string;
}

export interface ITemplateElement extends ITemplate {
  tag: string;
  attributes: Record<string, unknown>;
}

export type ElementChildType =
  | string
  | number
  | boolean
  | ITemplate
  | null
  | undefined;

export interface TemplateFn extends ITemplate {
  (strings: TemplateStringsArray, ...values: ElementChildType[]): ITemplate;
  [Symbol.iterator](): Iterator<unknown>;
}
