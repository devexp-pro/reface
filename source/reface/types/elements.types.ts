import type { TemplateHtmlAttributes } from "@reface/types";

// Базовые HTML атрибуты, общие для всех элементов
export interface HTMLAttributes extends TemplateHtmlAttributes {
  id?: string;
  title?: string;
  role?: string;
  tabindex?: number;
  // data-* атрибуты
  [key: `data-${string}`]: string;
  // aria-* атрибуты
  [key: `aria-${string}`]: string;
}

// Document Metadata
export interface HTMLMetaAttributes extends HTMLAttributes {
  charset?: string;
  content?: string;
  name?: string;
  "http-equiv"?: string;
}

export interface HTMLLinkAttributes extends HTMLAttributes {
  href?: string;
  rel?: string;
  type?: string;
  media?: string;
}

export interface HTMLStyleAttributes extends HTMLAttributes {
  media?: string;
  type?: string;
}

// Image and Multimedia
export interface HTMLImgAttributes extends HTMLAttributes {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  loading?: "lazy" | "eager";
}

export interface HTMLVideoAttributes extends HTMLAttributes {
  src?: string;
  controls?: boolean;
  width?: number | string;
  height?: number | string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
}

export interface HTMLAudioAttributes extends HTMLAttributes {
  src?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

// Forms
export interface HTMLFormAttributes extends HTMLAttributes {
  action?: string;
  method?: "get" | "post";
  enctype?: string;
  target?: string;
  novalidate?: boolean;
}

export interface HTMLLabelAttributes extends HTMLAttributes {
  for?: string; // обязательный
}

export interface HTMLInputAttributes extends HTMLAttributes {
  type?: string;
  name?: string;
  value?: string | number | readonly string[];
  checked?: boolean;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
}

export interface HTMLButtonAttributes extends HTMLAttributes {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  name?: string;
  value?: string;
}

export interface HTMLSelectAttributes extends HTMLAttributes {
  name?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: number;
}

export interface HTMLTextareaAttributes extends HTMLAttributes {
  name?: string;
  rows?: number;
  cols?: number;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
}

// Tables
export interface HTMLTableAttributes extends HTMLAttributes {
  border?: number;
  cellpadding?: number | string;
  cellspacing?: number | string;
}

export interface HTMLThAttributes extends HTMLAttributes {
  colspan?: number;
  rowspan?: number;
  scope?: "row" | "col" | "rowgroup" | "colgroup";
}

export interface HTMLTdAttributes extends HTMLAttributes {
  colspan?: number;
  rowspan?: number;
}

// Anchors
export interface HTMLAnchorAttributes extends HTMLAttributes {
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  download?: any;
}

// SVG
export interface HTMLSVGAttributes extends HTMLAttributes {
  viewBox?: string;
  width?: number | string;
  height?: number | string;
  xmlns?: string;
}

export interface HTMLPathAttributes extends HTMLAttributes {
  d?: string;
  fill?: string;
  stroke?: string;
}

// Content Sectioning
export interface HTMLSectioningAttributes extends HTMLAttributes {
  // Общие атрибуты для section, article, aside, nav
}

export interface HTMLHeaderAttributes extends HTMLAttributes {
  // Специфичные атрибуты для header
}

export interface HTMLFooterAttributes extends HTMLAttributes {
  // Специфичные атрибуты для footer
}

// Text Content
export interface HTMLPreAttributes extends HTMLAttributes {
  wrap?: string;
}

export interface HTMLBlockquoteAttributes extends HTMLAttributes {
  cite?: string;
}

export interface HTMLListAttributes extends HTMLAttributes {
  // Общие атрибуты для ol, ul
  type?: string;
  start?: number;
}

export interface HTMLDlAttributes extends HTMLAttributes {
  // Атрибуты для definition list
}

export interface HTMLFigureAttributes extends HTMLAttributes {
  // Атрибуты для figure
}

// Inline Text Semantics
export interface HTMLTimeAttributes extends HTMLAttributes {
  datetime?: string;
}

export interface HTMLProgressAttributes extends HTMLAttributes {
  value?: number;
  max?: number;
}

// Embedded Content
export interface HTMLIframeAttributes extends HTMLAttributes {
  src?: string;
  srcdoc?: string;
  name?: string;
  sandbox?: string;
  allow?: string;
  allowfullscreen?: boolean;
  width?: number | string;
  height?: number | string;
  loading?: "eager" | "lazy";
}

export interface HTMLEmbedAttributes extends HTMLAttributes {
  src?: string;
  type?: string;
  width?: number | string;
  height?: number | string;
}

export interface HTMLObjectAttributes extends HTMLAttributes {
  data?: string;
  type?: string;
  name?: string;
  width?: number | string;
  height?: number | string;
}

export interface HTMLSourceAttributes extends HTMLAttributes {
  src?: string;
  srcset?: string;
  sizes?: string;
  type?: string;
  media?: string;
}

// Canvas and Scripting
export interface HTMLCanvasAttributes extends HTMLAttributes {
  width?: number | string;
  height?: number | string;
}

export interface HTMLScriptAttributes extends HTMLAttributes {
  src?: string;
  type?: string;
  async?: boolean;
  defer?: boolean;
  crossorigin?: "anonymous" | "use-credentials";
  integrity?: string;
  nomodule?: boolean;
}

// Interactive Elements
export interface HTMLDetailsAttributes extends HTMLAttributes {
  open?: boolean;
}

export interface HTMLDialogAttributes extends HTMLAttributes {
  open?: boolean;
}

// Template
export interface HTMLTemplateAttributes extends HTMLAttributes {
  // Специфичные атрибуты для template
}
