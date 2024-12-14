import type { ElementChildType, ITemplate } from "../../core/types.ts";

export interface StyledComponent<Tag extends string = string>
  extends ITemplate {
  tag: Tag;
  rootClass: string;
  styles: string;
  (props?: Record<string, unknown>): StyledTagFunction<Tag>;
  extend(css: TemplateStringsArray, ...values: unknown[]): StyledComponent<Tag>;
}

export type StyledTagFunction<Tag extends string> = {
  (
    strings: TemplateStringsArray,
    ...values: ElementChildType[]
  ): StyledComponent<Tag>;
};

type StyledFactory<Tag extends string> = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => StyledComponent<Tag>;
type StyledExtend<Tag extends string> = (
  component: StyledComponent<Tag>,
) => StyledFactory<Tag>;

export type StyledType =
  & StyledExtend<string>
  & { [Tag in string]: StyledFactory<Tag> };
