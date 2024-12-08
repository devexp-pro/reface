/**
 * Base template interface
 */
export interface Template {
  tag: string;
  attributes: TemplateAttributes;
  children: ElementChild[];
  css?: string;
  rootClass?: string;
  isTemplate: true;
}

/**
 * Template attributes interface
 */
export interface TemplateAttributes {
  class?: string[];
  id?: string;
  style?: string | Record<string, string>;
  [key: string]: unknown;
}

/**
 * HTML Fragment interface for trusted HTML content
 */
export interface TemplateFragment {
  type: "fragment";
  content: string;
}

/**
 * Base HTML attributes interface
 */
export interface HTMLAttributes {
  class?: string | string[];
  id?: string;
  style?: string | Record<string, string>;
  children?: ElementChild | ElementChild[];
  [key: `data-${string}`]: string | number | boolean | undefined;
  [key: string]: unknown;
}

/**
 * Possible child types in templates
 */
export type ElementChild =
  | string
  | number
  | boolean
  | Template
  | TemplateFragment
  | null
  | undefined;

/**
 * Function that accepts template literals and returns Template
 */
export type TemplateLiteralFunction = {
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
} & Pick<Template, "isTemplate" | "tag" | "css" | "rootClass">;

/**
 * Base component function type
 */
export type ComponentFunction<P = HTMLAttributes> = {
  (props?: P): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
} & Pick<Template, "isTemplate" | "tag" | "css" | "rootClass">;

/**
 * Simple component function type (only JSX)
 */
export type SimpleComponentFunction<P = HTMLAttributes> = ((
  props: P
) => Template) &
  Pick<Template, "isTemplate" | "tag">;

/**
 * Type guard for TemplateFragment
 */
export function isTemplateFragment(value: unknown): value is TemplateFragment {
  return (
    typeof value === "object" &&
    value !== null &&
    "type" in value &&
    value.type === "fragment" &&
    "content" in value
  );
}

/**
 * Styled component function type
 */
export type StyledComponentFunction<P = HTMLAttributes> = {
  (props?: P): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
} & Pick<Template, "isTemplate" | "tag" | "css" | "rootClass">;
