import type { Template } from "@reface/html";

/**
 * HTML attributes interface
 */
export interface HTMLAttributes {
  class?: string | string[];
  style?: string | Record<string, string | number>;
  [key: string]: unknown;
}

/**
 * Element child types
 */
export type ElementChild =
  | string
  | number
  | boolean
  | Template
  | null
  | undefined;

/**
 * Template literal function
 */
export interface TemplateLiteralFunction {
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  isTemplate: true;
  tag: string;
}

/**
 * Style interpolation types
 */
export type StyleInterpolation = string | number | CSSResult;

/**
 * Element function interface
 */
export type ElementFunction<A = HTMLAttributes> = {
  (props: A): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  isTemplate: true;
  tag: string;
};

/**
 * Component function interface
 */
export type ComponentFunction<P = HTMLAttributes> = {
  (props: P): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  isTemplate: true;
  tag: string;
  css?: string;
};

/**
 * Styled component interface
 */
export type StyledComponent<P = HTMLAttributes> = ComponentFunction<P> & {
  css: string;
  rootClass: string;
};

/**
 * Styled factory type
 */
export type StyledFactory = {
  <P = HTMLAttributes>(
    strings: TemplateStringsArray | string,
    ...values: unknown[]
  ): StyledComponent<P>;
} & {
  [K in keyof JSX.IntrinsicElements]: StyledFactory;
} & {
  <P = HTMLAttributes>(
    component: ComponentFunction<P> | StyledComponent<P>
  ): StyledFactory;
};

/**
 * CSS result interface
 */
export interface CSSResult {
  isStyle: true;
  str: TemplateStringsArray | string;
  args: unknown[];
  isKeyframes?: boolean;
}
