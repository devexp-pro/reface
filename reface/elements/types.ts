import type { HTMLAttributes } from "../types/base.ts";

// Button attributes
export interface ButtonAttributes extends HTMLAttributes {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  form?: string;
  name?: string;
}

// Input attributes
export interface InputAttributes extends HTMLAttributes {
  type?:
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
  name?: string;
}

// Anchor attributes
export interface AnchorAttributes extends HTMLAttributes {
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  rel?: string;
  download?: string;
}

// Image attributes
export interface ImgAttributes extends HTMLAttributes {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  loading?: "eager" | "lazy";
}

// Table attributes
export interface TableAttributes extends HTMLAttributes {
  border?: number;
  cellPadding?: number | string;
  cellSpacing?: number | string;
}

// Form attributes
export interface FormAttributes extends HTMLAttributes {
  action?: string;
  method?: "get" | "post";
  enctype?: string;
  target?: string;
  noValidate?: boolean;
}

// Select attributes
export interface SelectAttributes extends HTMLAttributes {
  multiple?: boolean;
  size?: number;
  required?: boolean;
  disabled?: boolean;
  name?: string;
}

// Option attributes
export interface OptionAttributes extends HTMLAttributes {
  value: string;
  selected?: boolean;
  disabled?: boolean;
  label?: string;
}

// Textarea attributes
export interface TextareaAttributes extends HTMLAttributes {
  rows?: number;
  cols?: number;
  wrap?: "soft" | "hard";
  readonly?: boolean;
  required?: boolean;
  placeholder?: string;
  name?: string;
}
