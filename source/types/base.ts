// Basic types
export type ClassValue = string | { [key: string]: boolean } | ClassValue[];
export type ClassInput = ClassValue | ClassValue[] | undefined | null | boolean;
export type StyleValue = string | { [key: string]: string | number };
export type StyleInput = string | Record<string, StyleValue>;

// Element types
export type ElementChild =
  | string
  | number
  | boolean
  | null
  | undefined
  | Template;
export type ElementChildren = ElementChild[];

// HTML Attributes
export interface HTMLAttributes {
  class?: string | ClassValue;
  style?: string | StyleInput;
  id?: string;
  title?: string;
  role?: string;
  tabindex?: number;
  type?: string;
  value?: string | number;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  placeholder?: string;
  onClick?: string;
  onSubmit?: string;
  onChange?: string;
  onInput?: string;
  onFocus?: string;
  onBlur?: string;
  [key: `data-${string}`]: string | number | boolean | undefined;
}

// Template type
export interface Template {
  tag: string;
  attributes: string;
  children: unknown[];
  css: string;
  isTemplate: true;
  str: TemplateStringsArray;
  args: (string | Template)[];
  rootClass: string;
}

// Element factory type
export type ElementFactory<A extends HTMLAttributes = HTMLAttributes> = {
  (attributes?: A): (
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ) => Template;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  name?: string;
};

// Styled component type
export type StyledComponent<A extends HTMLAttributes = HTMLAttributes> =
  ElementFactory<A> & {
    className: string;
    displayName?: string;
  };

// Make InputAttributes extend HTMLAttributes
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
  // ... other properties
}
