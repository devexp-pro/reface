import { createLogger } from "@reface/core";

const logger = createLogger("HTML:Types");

/**
 * Base template interface
 */
export interface Template {
  tag: string;
  attributes: TemplateAttributes;
  children: ElementChild[];
  isTemplate: true;
  css: string;
  rootClass: string;
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
  [key: string]: unknown;
  class?: string | string[];
  style?: string | Record<string, string>;
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
  isTemplate: true;
  tag: string;
};

/**
 * Base component function type
 */
export type ComponentFunction<P = HTMLAttributes> = {
  (props?: P): Template | TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  isTemplate: true;
  tag: string;
};

/**
 * Simple component function type (only JSX)
 */
export type SimpleComponentFunction<P = HTMLAttributes> = ((
  props: P
) => Template) &
  Pick<Template, "isTemplate" | "tag">;

/**
 * Check if value is TemplateFragment
 */
export function isTemplateFragment(value: unknown): value is TemplateFragment {
  const is = typeof value === "object" && value !== null && "content" in value;
  logger.debug("Checking if value is template fragment", {
    is,
    type: typeof value,
    hasContent: value && typeof value === "object" && "content" in value,
  });
  return is;
}

/**
 * Styled component function type
 */
export type StyledComponentFunction<P = HTMLAttributes> = {
  (props?: P): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
} & Pick<Template, "isTemplate" | "tag" | "css" | "rootClass">;

export type TemplateAttributes = Record<string, unknown>;

export type RenderOptions = {
  collectStyles?: boolean;
  styleCollector?: Set<string>;
};

/**
 * Style interpolation types
 */
export type StyleInterpolation =
  | string
  | number
  | boolean
  | undefined
  | null
  | (() => Template);

/**
 * Style processing options
 */
export interface StyleProcessingOptions {
  className: string;
  prefix?: string;
}
