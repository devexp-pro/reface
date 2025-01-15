import type {
  Template,
  TemplateAttributes,
  TemplatePayload,
} from "@reface/template";

export interface StyledPayload extends TemplatePayload {
  styled: {
    styles: string;
    rootClass: string;
    tag: string;
  };
}

export type StyledComponent = Template<TemplateAttributes, StyledPayload>;

export type StyledTagFn = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => StyledComponent;

export type StyledFn = {
  (component: StyledComponent): StyledTagFn;

  [tag: string]: StyledTagFn;
};

export interface StyledAttributes extends TemplateAttributes {
  class?: string | string[];
  style?: string | Record<string, string | number>;
  [key: string]: unknown;
}
