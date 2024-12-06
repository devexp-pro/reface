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

// Специфичные атрибуты для элементов
export interface AnchorAttributes extends HTMLAttributes {
  href: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  download?: string;
}

export interface ButtonAttributes extends HTMLAttributes {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  form?: string;
  name?: string;
}

export interface InputAttributes extends FormAttributes {
  type:
    | "text"
    | "password"
    | "email"
    | "number"
    | "checkbox"
    | "radio"
    | "file"
    | "date"
    | "time"
    | "datetime-local"
    | "month"
    | "week"
    | "tel"
    | "url"
    | "search"
    | "color"
    | "range";
  value?: string | number;
  placeholder?: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  pattern?: string;
}

export interface TextareaAttributes extends FormAttributes {
  rows?: number;
  cols?: number;
  wrap?: "soft" | "hard";
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
}

export interface SelectAttributes extends FormAttributes {
  multiple?: boolean;
  size?: number;
  required?: boolean;
  disabled?: boolean;
}

export interface OptionAttributes extends HTMLAttributes {
  value: string;
  selected?: boolean;
  disabled?: boolean;
  label?: string;
}

export interface ImgAttributes extends MediaAttributes {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  loading?: "eager" | "lazy";
}

export interface VideoAttributes extends MediaAttributes {
  src?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  poster?: string;
  preload?: "none" | "metadata" | "auto";
}
