import type { Template } from "../types.ts";

// Базовые типы для значений классов
export type ClassValue = {
  [key: string]: boolean;
};

export type ClassInput =
  | string
  | Record<string, boolean | undefined | null>
  | null
  | undefined
  | boolean;

// HTML атрибуты
export interface HTMLAttributes {
  class?: string | ClassValue;
  style?: string;
  id?: string;
  title?: string;
  role?: string;
  tabindex?: number;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
  "data-testid"?: string;
  [key: `data-${string}`]: string | number | boolean | undefined;
  [key: string]: unknown;
}

// События
export interface EventAttributes {
  onClick?: string;
  onChange?: string;
  onSubmit?: string;
  onInput?: string;
  onKeyDown?: string;
  onKeyUp?: string;
  onFocus?: string;
  onBlur?: string;
  onMouseEnter?: string;
  onMouseLeave?: string;
}

// HTMX атрибуты
export interface HtmxAttributes {
  "hx-get"?: string;
  "hx-post"?: string;
  "hx-put"?: string;
  "hx-delete"?: string;
  "hx-patch"?: string;
  "hx-target"?: string;
  "hx-swap"?: string;
  "hx-trigger"?: string;
  "hx-vals"?: string;
  "hx-push-url"?: string;
  "hx-select"?: string;
  "hx-ext"?: string;
}

// Объединяем все атрибуты
export type Attributes = HTMLAttributes & EventAttributes & HtmxAttributes;

// Типы для детей элементов
export type ElementChild = string | number | Template | null | undefined;
export type ElementChildren = ElementChild[];

// Фабрика элементов
export type ElementFactory = (
  strings: TemplateStringsArray,
  ...values: ElementChildren
) => Template;

// Специфичные атрибуты для разных элементов
export interface InputAttributes extends Attributes {
  type?: string;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  checked?: boolean;
  min?: number;
  max?: number;
  step?: number;
  pattern?: string;
  readonly?: boolean;
  name?: string;
}

export interface ImageAttributes extends Attributes {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
}

export interface AnchorAttributes extends Attributes {
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  download?: string | boolean;
}

export interface FormAttributes extends Attributes {
  action?: string;
  method?: "get" | "post";
  enctype?: string;
  autocomplete?: "on" | "off";
  novalidate?: boolean;
}

// SVG атрибуты
export interface SVGAttributes extends Attributes {
  xmlns?: string;
  viewBox?: string;
  width?: number | string;
  height?: number | string;
  fill?: string;
  stroke?: string;
  "stroke-width"?: number | string;
  d?: string;
}
