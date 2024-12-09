import { createLogger } from "@reface/core";

const logger = createLogger("HTML:Types");

/**
 * Base HTML attributes interface
 */
export interface IHTMLAttributes {
  [key: string]: unknown;
  class?: string | string[];
  style?: string | Record<string, string>;
}

/**
 * Base template interface
 */
export interface ITemplate {
  tag: string;
  attributes: IHTMLAttributes;
  children: ElementChildType[];
  isTemplate: true;
  css?: string;
  rootClass?: string;
  script?: string;
  scriptFile?: string;
}

/**
 * HTML Fragment interface for trusted HTML content
 */
export interface ITemplateFragment {
  type: "html";
  content: string;
}

/**
 * Possible child types in templates
 */
export type ElementChildType =
  | string
  | number
  | boolean
  | ITemplate
  | ITemplateFragment
  | null
  | undefined;

/**
 * Function that accepts template literals and returns Template
 */
export interface ITemplateLiteralFunction {
  (props?: Record<string, unknown>): ITemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChildType[]): ITemplate;
  isTemplate: true;
  tag: string;
}

/**
 * Base component function type
 */
export interface IComponentFunction<P = IHTMLAttributes> {
  (props?: P): ITemplate | ITemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChildType[]): ITemplate;
  isTemplate: true;
  tag: string;
}

/**
 * Simple component function type (only JSX)
 */
export type SimpleComponentFunctionType<P = IHTMLAttributes> =
  & ((props: P) => ITemplate)
  & Pick<ITemplate, "isTemplate" | "tag">;

/**
 * Styled component function type
 */
export interface IStyledComponentFunction<P = IHTMLAttributes> {
  (props?: P): ITemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChildType[]): ITemplate;
  isTemplate: true;
  tag: string;
  css: string;
  rootClass: string;
}

export type RenderOptionsType = {
  collectStyles?: boolean;
  styleCollector?: Set<string>;
};

/**
 * Style interpolation types
 */
export type StyleInterpolationType =
  | string
  | number
  | boolean
  | undefined
  | null
  | (() => ITemplate);

/**
 * Style processing options
 */
export interface IStyleProcessingOptions {
  className: string;
  prefix?: string;
}

/**
 * Check if value is TemplateFragment
 */
export function isTemplateFragment(value: unknown): value is ITemplateFragment {
  const is = typeof value === "object" && value !== null && "content" in value;
  logger.debug("Checking if value is template fragment", {
    is,
    type: typeof value,
    hasContent: value && typeof value === "object" && "content" in value,
  });
  return is;
}
