import type {
  HTMLAttributes,
  ElementChild,
  Template,
  TemplateLiteralFunction,
} from "../html/types.ts";

/**
 * Element factory function
 */
export type ElementFactory = <A extends HTMLAttributes = HTMLAttributes>(
  tag: string
) => ElementFunction<A>;

/**
 * Element factory props
 */
export type ElementFactoryProps<A> = A & {
  children?: ElementChild | ElementChild[];
};

/**
 * Component render function
 */
export type ComponentRenderFunction<T> = (
  props: T,
  children: ElementChild[]
) => Template;

/**
 * Component props
 */
export type ComponentProps<T> = T & {
  children?: ElementChild | ElementChild[];
};

export type ElementFunction<A = HTMLAttributes> = {
  (props: ElementFactoryProps<A>): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  isTemplate: true;
  tag: string;
};

/**
 * Styled component options
 */
export interface StyledComponentOptions {
  tag: string;
  css: string;
  className: string;
}

/**
 * Styled component function
 */
export type StyledComponent<P = HTMLAttributes> = {
  (props: P & { class?: string | string[] }): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  isTemplate: true;
  tag: string;
  css: string;
  rootClass: string;
};

/**
 * Styled factory function
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
    component: ElementFunction<P> | StyledComponent<P>
  ): StyledFactory;
};

/**
 * CSS template literal result
 */
export interface CSSResult {
  isStyle: true;
  str: TemplateStringsArray | string;
  args: unknown[];
  isKeyframes?: boolean;
}
