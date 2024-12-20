type ClassObject = Record<string, boolean>;
type StyleObject = Record<string, string | number>;

type SingleClassValue = string | ClassObject;
type SingleStyleValue = string | StyleObject;

export type ClassValue = SingleClassValue | SingleClassValue[];
export type StyleValue = SingleStyleValue | SingleStyleValue[];

export type TemplateConfigAttributes = {
  class?: ClassValue;
  style?: StyleValue;
  id?: string;
  [key: string]: unknown;
};

export type TemplateAttributes = {
  [key: string]: unknown;
};

export type TemplatePayload = Record<string, any>;
export type PrimitiveChild = string | number | boolean | null | undefined;
export type ComplexChild = Template | ElementChildType[];
export type ElementChildType = PrimitiveChild | ComplexChild;

export type TemplateTransformer<
  A extends Record<string, any> = TemplateAttributes,
  P extends Record<string, any> = TemplatePayload,
> = (attrs: A, children: ElementChildType[]) => Template<A, P>;

export type TemplateFactoryConfig<
  A extends Record<string, any> = TemplateAttributes,
  P extends Record<string, any> = TemplatePayload,
> = {
  type: string;
  transformer?: TemplateTransformer<A, P>;
  toHtml?: (template: Template<A, P>) => string;
  config?: TemplateConfig<A, P>;
};

export type TemplateConfig<
  A extends TemplateConfigAttributes = TemplateConfigAttributes,
  P extends Record<string, any> = TemplatePayload,
> = {
  children?: ElementChildType[];
  attributes?: A;
  tag?: string;
  payload?: P;
};

export interface TemplateInstance<
  A extends Record<string, any> = TemplateAttributes,
  P extends Record<string, any> = TemplatePayload,
> {
  type: string;
  children: ElementChildType[];
  attributes: A;
  tag?: string;
  payload?: P;
}

export type Template<
  A extends Record<string, any> = TemplateAttributes,
  P extends Record<string, any> = TemplatePayload,
> =
  & TemplateInstance<A, P>
  & {
    (strings: TemplateStringsArray, ...values: any[]): Template<A, P>;
    (attributes: A): Template<A, P>;
  };

export interface TemplateFactory<
  A extends Record<string, any> = TemplateAttributes,
  P extends Record<string, any> = TemplatePayload,
> {
  (config: TemplateFactoryConfig<A, P>): (
    config: TemplateConfig<A, P>,
  ) => Template<A, P>;
}
