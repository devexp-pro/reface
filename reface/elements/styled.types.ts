import type { ElementFactory, Template } from "../core/types.ts";

/**
 * Base styled component type
 */
export type StyledComponent = (props?: Record<string, unknown>) => Template;

/**
 * Styled factory function type
 */
export type StyledFactory = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => ElementFactory<Record<string, unknown>>;

/**
 * Styled API interface
 */
export interface StyledTags {
  div: StyledFactory;
  span: StyledFactory;
  p: StyledFactory;
  h1: StyledFactory;
  h2: StyledFactory;
  h3: StyledFactory;
  h4: StyledFactory;
  h5: StyledFactory;
  h6: StyledFactory;
  header: StyledFactory;
  footer: StyledFactory;
  nav: StyledFactory;
  main: StyledFactory;
  section: StyledFactory;
  article: StyledFactory;
  pre: StyledFactory;
  code: StyledFactory;
  button: StyledFactory;
  input: StyledFactory;
  a: StyledFactory;
  [key: string]: StyledFactory;
}

export type StyledAPI = StyledTags &
  ((component: StyledComponent) => StyledFactory);
