import type { Template } from "../types.ts";

export type StyleInput = string | Record<string, string | number | undefined>;

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
  style?: string | StyleInput;
  id?: string;
  title?: string;
  role?: string;
  tabindex?: number;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
  [key: `data-${string}`]: string | number | boolean | undefined;
  [key: string]: unknown;
}

// События
export type EventHandler = `${string}(${string})` | undefined;

// TODO: Подумать на тему того, чтобы не использовать EventHandler
export interface EventAttributes {
  onClick?: EventHandler;
  onChange?: EventHandler;
  onSubmit?: EventHandler;
  onInput?: EventHandler;
  onKeyDown?: EventHandler;
  onKeyUp?: EventHandler;
  onFocus?: EventHandler;
  onBlur?: EventHandler;
  onMouseEnter?: EventHandler;
  onMouseLeave?: EventHandler;
  [key: `on${Capitalize<string>}`]: EventHandler;
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

// Дополнительные ARIA атрибуты
export interface AriaAttributes {
  // Роли и состояния
  role?:
    | "button"
    | "checkbox"
    | "dialog"
    | "gridcell"
    | "link"
    | "menuitem"
    | "menuitemcheckbox"
    | "menuitemradio"
    | "option"
    | "progressbar"
    | "radio"
    | "scrollbar"
    | "searchbox"
    | "slider"
    | "spinbutton"
    | "switch"
    | "tab"
    | "tabpanel"
    | "textbox"
    | "treeitem";
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean | "mixed";
  "aria-selected"?: boolean;
  "aria-checked"?: boolean | "mixed";
  "aria-disabled"?: boolean;
  "aria-hidden"?: boolean;
  "aria-invalid"?: boolean | "grammar" | "spelling";
  "aria-required"?: boolean;

  // Взаимосвязи
  "aria-controls"?: string;
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  "aria-owns"?: string;
  "aria-flowto"?: string;

  // Живые регионы
  "aria-live"?: "off" | "polite" | "assertive";
  "aria-atomic"?: boolean;
  "aria-relevant"?: "additions" | "removals" | "text" | "all";
  "aria-busy"?: boolean;

  // Drag & Drop
  "aria-grabbed"?: boolean;
  "aria-dropeffect"?: "none" | "copy" | "move" | "link" | "execute" | "popup";

  // Значения и диапазоны
  "aria-valuemin"?: number;
  "aria-valuemax"?: number;
  "aria-valuenow"?: number;
  "aria-valuetext"?: string;

  // Структура документа
  "aria-level"?: number;
  "aria-setsize"?: number;
  "aria-posinset"?: number;
}

export interface IframeAttributes extends Attributes {
  src?: string;
  srcdoc?: string;
  allow?: string;
  allowfullscreen?: boolean;
  loading?: "lazy" | "eager";
  name?: string;
  sandbox?: string;
}

export interface ProgressAttributes extends Attributes {
  value?: number;
  max?: number;
}

export interface MeterAttributes extends Attributes {
  value?: number;
  min?: number;
  max?: number;
  low?: number;
  high?: number;
  optimum?: number;
}

export interface DetailsAttributes extends Attributes {
  open?: boolean;
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
