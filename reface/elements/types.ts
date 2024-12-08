import type {
  HTMLAttributes,
  ElementChild,
  Template,
  TemplateLiteralFunction,
} from "../html/types.ts";

export type ElementFactoryProps<A> = A & {
  children?: ElementChild | ElementChild[];
};

export type ElementFunction<A = HTMLAttributes> = {
  (props: ElementFactoryProps<A>): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  isTemplate: true;
  tag: string;
};

export type StyledComponent<P = HTMLAttributes> = {
  (props: P & { class?: string | string[] }): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  isTemplate: true;
  tag: string;
  css: string;
  rootClass: string;
};

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

export type ElementFactory = <A extends HTMLAttributes = HTMLAttributes>(
  tag: string
) => ElementFunction<A>;

export type ComponentProps<T> = T & {
  children?: ElementChild | ElementChild[];
};

export type ComponentRenderFunction<T> = (
  props: T,
  children: ElementChild[]
) => Template;
