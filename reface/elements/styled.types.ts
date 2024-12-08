import type {
  ComponentFunction,
  HTMLAttributes,
  TemplateLiteralFunction,
  StyledComponentFunction,
} from "../core/types.ts";

/**
 * Base styled component type
 */
export type StyledComponent<P = HTMLAttributes> = StyledComponentFunction<P> & {
  css: string;
  rootClass: string;
};

/**
 * Styled factory function type
 */
export type StyledFactory = {
  <P = HTMLAttributes>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): StyledComponent<P>;
  (css: string): StyledComponent<HTMLAttributes>;
} & {
  [K in keyof JSX.IntrinsicElements]: StyledFactory;
} & {
  <P = HTMLAttributes>(
    component: ComponentFunction<P> | StyledComponent<P>
  ): StyledFactory;
};

/**
 * Styled API interface
 */
export type StyledAPI = {
  [K in keyof JSX.IntrinsicElements]: StyledFactory;
} & {
  <P = HTMLAttributes>(
    component: StyledComponentFunction<P> | StyledComponent<P>
  ): StyledFactory;
};
