import type { Attributes } from "./mod.ts";

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

// Медиа атрибуты
export interface MediaAttributes extends Attributes {
  src?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto";
}

// Табличные атрибуты
export interface TableCellAttributes extends Attributes {
  colspan?: number;
  rowspan?: number;
  headers?: string;
}

// Canvas и специальные элементы
export interface CanvasAttributes extends Attributes {
  width?: number;
  height?: number;
  // WebGL контекст
  webgl?: boolean;
  webgl2?: boolean;
  // 2D контекст
  alpha?: boolean;
  desynchronized?: boolean;
  willReadFrequently?: boolean;
}

export interface DialogAttributes extends Attributes {
  open?: boolean;
  returnValue?: string;
}

export interface TimeAttributes extends Attributes {
  datetime?: string;
}

// Типы для элементов <head>
export interface TitleAttributes extends Attributes {}

export interface MetaAttributes extends Attributes {
  charset?: string;
  name?: string;
  content?: string;
  httpEquiv?: string;
}

export interface LinkAttributes extends Attributes {
  rel?: string;
  href?: string;
  type?: string;
  media?: string;
  integrity?: string;
  crossorigin?: "anonymous" | "use-credentials";
}

export interface StyleAttributes extends Attributes {
  type?: string;
  media?: string;
}

export interface ScriptAttributes extends Attributes {
  src?: string;
  type?: string;
  async?: boolean;
  defer?: boolean;
  integrity?: string;
  crossorigin?: "anonymous" | "use-credentials";
}

export interface BaseAttributes extends Attributes {
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface NoscriptAttributes extends Attributes {}
