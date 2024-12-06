/**
 * Base HTML attributes
 */
export interface HTMLAttributes extends Record<string, unknown> {
  class?: string;
  id?: string;
  style?: string;
  [key: `data-${string}`]: string | number | boolean | undefined;
}

/**
 * Base template interface for all components
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
