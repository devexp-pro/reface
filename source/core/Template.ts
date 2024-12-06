/**
 * Base template interface
 */
export interface Template {
  tag: string;
  attributes: string;
  children: (string | Template)[];
  css: string;
  isTemplate: true;
  str: TemplateStringsArray;
  args: (string | Template)[];
  rootClass: string;
}

/**
 * Base HTML attributes
 */
export interface HTMLAttributes {
  class?: string;
  id?: string;
  style?: string;
  [key: `data-${string}`]: string | number | boolean | undefined;
}

/**
 * Possible child types in templates
 */
export type ElementChild =
  | string
  | number
  | boolean
  | Template
  | null
  | undefined;

/**
 * Base factory function type
 */
export type ElementFactory<A> = {
  (attributes?: A): (
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ) => Template;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
};

/**
 * Template generator function
 */
export type TemplateGenerator<T> = (props: T) => Template;
