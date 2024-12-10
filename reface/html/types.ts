import { createLogger } from "@reface/core";
import type { TemplateText } from "./TemplateText.ts";

const logger = createLogger("HTML:Types");

/**
 * Base HTML attributes interface
 */
export interface HTMLAttributes<T extends string = string> {
  class?: string;
  id?: string;
  style?: string;
  [key: string]: unknown;
}

/**
 * Base template interface
 */
export interface ITemplate {
  toHtml(context: RenderContext): string;
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
  | null
  | undefined
  | ElementChildType[];

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
export interface IComponentFunction<P = HTMLAttributes> {
  (props?: P): ITemplate | ITemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChildType[]): ITemplate;
  isTemplate: true;
  tag: string;
}

/**
 * Simple component function type (only JSX)
 */
export type SimpleComponentFunctionType<P = HTMLAttributes> =
  & ((props: P) => ITemplate)
  & Pick<ITemplate, "isTemplate" | "tag">;

/**
 * Styled component function type
 */
export interface IStyledComponentFunction<P = HTMLAttributes> {
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

// Базовые HTML типы
export interface HTMLElement {
  id?: string;
  className?: string;
  style?: string;
}

// Специфичные HTML элементы
export interface HTMLAnchorElement extends HTMLElement {
  href?: string;
  target?: string;
  rel?: string;
}

export interface HTMLButtonElement extends HTMLElement {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface HTMLInputElement extends HTMLElement {
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  checked?: boolean;
}

export interface HTMLImageElement extends HTMLElement {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

export interface HTMLDivElement extends HTMLElement {}
export interface HTMLSpanElement extends HTMLElement {}
export interface HTMLParagraphElement extends HTMLElement {}
export interface HTMLHeadingElement extends HTMLElement {}

// Карта HTML элементов
export interface HTMLElementTagNameMap {
  a: HTMLAnchorElement;
  button: HTMLButtonElement;
  div: HTMLDivElement;
  img: HTMLImageElement;
  input: HTMLInputElement;
  p: HTMLParagraphElement;
  span: HTMLSpanElement;
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;
  [key: string]: HTMLElement;
}

// Специфичные HTML атрибуты
export interface AnchorHTMLAttributes extends HTMLAttributes<"a"> {
  href?: string;
  target?: string;
  rel?: string;
}

export interface ButtonHTMLAttributes extends HTMLAttributes<"button"> {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export interface InputHTMLAttributes extends HTMLAttributes<"input"> {
  type?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  checked?: boolean;
}

export interface ImgHTMLAttributes extends HTMLAttributes<"img"> {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

// Карта HTML атрибутов
export interface HTMLAttributesMap {
  a: AnchorHTMLAttributes;
  button: ButtonHTMLAttributes;
  div: HTMLAttributes<"div">;
  img: ImgHTMLAttributes;
  input: InputHTMLAttributes;
  p: HTMLAttributes<"p">;
  span: HTMLAttributes<"span">;
  h1: HTMLAttributes<"h1">;
  h2: HTMLAttributes<"h2">;
  h3: HTMLAttributes<"h3">;
  h4: HTMLAttributes<"h4">;
  h5: HTMLAttributes<"h5">;
  h6: HTMLAttributes<"h6">;
  [key: string]: HTMLAttributes;
}
