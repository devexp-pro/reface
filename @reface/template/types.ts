import type { IRefaceRenderManager } from "../types/composer.types.ts";
import type { REFACE_TEMPLATE } from "./constants.ts";

export type NormalizeAttributes<T extends BaseAttributes> = T extends
  TemplateHtmlAttributes ? Omit<T, "class" | "style"> & {
    class?: string[];
    style?: string[];
  }
  : T;

export type ClassValue =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[];
export type StyleValue =
  | null
  | undefined
  | string
  | Record<string, string | number | null | boolean>
  | (string | Record<string, string | number | null | boolean>)[];

export interface TemplatePayload {
  [key: string]: any;
}

export type PrimitiveChild = string | number | boolean | null | undefined;
export type ComplexChild = Template<any, any, any>;
export type ElementChildType = Arrayable<PrimitiveChild | ComplexChild>;

export type ComponentFn<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> = (
  attrs: A,
  children: ElementChildType[],
) => Template<A, P>;

export type RawTemplateAttributes = {
  [key: string]: any;
  classes?: string[];
  styles?: Record<string, string>;
};

export interface RawTemplate<
  A extends RawTemplateAttributes = RawTemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> {
  type: string;
  tag?: string;
  void?: boolean;
  attributes: A;
  children: ElementChildType[];
  payload: P;
}

type Arrayable<T> = T | T[];

export type TemplateAttributesClass = Arrayable<
  | string
  | string[]
  | null
  | undefined
  | boolean
  | { [key: string]: boolean }
>;
export type TemplateAttributesStyle = Arrayable<
  | string
  | string[]
  | { [key: string]: boolean | string | number }
  | null
  | undefined
  | boolean
>;

export type TemplateAttributes = {
  class?: TemplateAttributesClass;
  style?: TemplateAttributesStyle;
  [key: string]: any;
};

export type TemplateMethod<
  A extends TemplateAttributes,
  P extends TemplatePayload,
  Args extends any[] = any[],
  R = any,
> = (
  first: { template: RawTemplate<NormalizeAttributes<A>, P> },
  ...args: Args
) => R;

export type TransformedMethod<M> = M extends
  TemplateMethod<any, any, infer Args, infer R> ? (...args: Args) => R
  : never;

export type TemplateMethods<
  A extends TemplateAttributes,
  P extends TemplatePayload,
> = {
  [key: string]: TemplateMethod<A, P>;
};

export type TransformedMethods<
  M extends TemplateMethods<any, any>,
> = {
  [K in keyof M]: TransformedMethod<M[K]>;
};

export type Template<
  A extends BaseAttributes = BaseAttributes,
  P extends TemplatePayload = TemplatePayload,
  M extends TemplateMethods<A, P> = TemplateMethods<A, P>,
> =
  & {
    (attributes: A): Template<A, P, M>;
    (strings: TemplateStringsArray, ...values: any[]): Template<A, P, M>;
  }
  & TransformedMethods<M>
  & {
    [REFACE_TEMPLATE]: true;
    raw: RawTemplate<NormalizeAttributes<A>, P>;
  };

export type TemplateFactory<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
  M extends TemplateMethods<A, P> = TemplateMethods<A, P>,
> = {
  (config: BaseTemplateConfig<P>): Template<A, P, M>;

  (
    config: HTMLTemplateConfig<A & TemplateHtmlAttributes, P>,
  ): Template<A & TemplateHtmlAttributes, P, M>;

  <CA extends BaseAttributes>(
    component: ComponentFn<CA, P>,
  ): Template<CA, P, TemplateMethods<CA, P>>;
};

export type BaseTemplateConfig<P extends TemplatePayload = TemplatePayload> = {
  payload?: P;
  children?: ElementChildType[];
};

export type HTMLTemplateConfig<
  A extends TemplateHtmlAttributes = TemplateHtmlAttributes,
  P extends TemplatePayload = TemplatePayload,
> =
  & BaseTemplateConfig<P>
  & {
    tag: string;
    attributes?: A;
  }
  & (
    | { void: true; children?: never }
    | { void?: false; children?: ElementChildType[] }
  );

export type TransformTemplate<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
> = (params: {
  attrs: A;
  children: ElementChildType[];
  manager: IRefaceRenderManager;
}) => RawTemplate<NormalizeAttributes<A>, P>;

export interface TemplateFactoryConfig<
  A extends TemplateAttributes = TemplateAttributes,
  P extends TemplatePayload = TemplatePayload,
  M extends TemplateMethods<A, P> = TemplateMethods<A, P>,
> {
  type: string;

  create?: {
    defaults?: {
      attributes?: A;
      payload?: P;
      tag?: string;
    };
  };

  process?: {
    attributes?: (params: {
      oldAttrs: NormalizeAttributes<A>;
      newAttrs: NormalizeAttributes<A>;
      template?: RawTemplate<NormalizeAttributes<A>, P>;
    }) => A;

    children?: (params: {
      oldChildren: ElementChildType[];
      newChildren: ElementChildType[];
      template?: RawTemplate<NormalizeAttributes<A>, P>;
    }) => ElementChildType[];
  };

  methods?: M;

  render?: {
    template?: (params: {
      template: RawTemplate<NormalizeAttributes<A>, P>;
      manager: IRefaceRenderManager;
    }) => string;

    attributes?: (params: {
      attrs: A;
      template: RawTemplate<NormalizeAttributes<A>, P>;
      manager: IRefaceRenderManager;
    }) => string;

    styles?: (params: {
      styles: Record<string, string>;
      template: RawTemplate<NormalizeAttributes<A>, P>;
      manager: IRefaceRenderManager;
    }) => string;

    classes?: (params: {
      classes: string[];
      template: RawTemplate<NormalizeAttributes<A>, P>;
      manager: IRefaceRenderManager;
    }) => string;
  };
}

export interface BaseAttributes {
  [key: string]: any;
}

export interface TemplateHtmlAttributes extends BaseAttributes {
  class?: TemplateAttributesClass;
  style?: TemplateAttributesStyle;
}
