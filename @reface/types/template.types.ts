import type { BaseTemplate, ElementChildType } from "./base.types.ts";
import type { HTMLAttributes } from "./html.types.ts";

export interface IRefaceTemplate extends BaseTemplate {}

export interface IRefaceTemplateElement extends IRefaceTemplate {
  tag: string;
  attributes: HTMLAttributes;
  children: ElementChildType[];
}

export type RefaceTemplateFn<T extends IRefaceTemplate = IRefaceTemplate> = {
  (
    strings: TemplateStringsArray | string,
    ...values: (ElementChildType | ElementChildType[])[]
  ): T;
};
