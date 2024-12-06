import type { HTMLAttributes } from "../core/Template.ts";

// HTML Element Attributes
export interface HTMLElementAttributes extends HTMLAttributes {
  ref?: any;
  key?: string | number;
  dangerouslySetInnerHTML?: { __html: string };
}

// Specific Element Attributes
export interface HTMLDivAttributes extends HTMLElementAttributes {}
export interface HTMLSpanAttributes extends HTMLElementAttributes {}
export interface HTMLButtonAttributes extends HTMLElementAttributes {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
export interface HTMLInputAttributes extends HTMLElementAttributes {
  type?: string;
  value?: string | number;
  checked?: boolean;
  placeholder?: string;
}
// ... другие специфичные атрибуты

// JSX Namespace
declare global {
  namespace JSX {
    // Element types
    interface Element {
      type: string | Function;
      props: any;
      children: Element[];
    }

    // IntrinsicElements map
    interface IntrinsicElements {
      div: HTMLDivAttributes;
      span: HTMLSpanAttributes;
      button: HTMLButtonAttributes;
      input: HTMLInputAttributes;
      // ... все HTML элементы
    }

    // Component attributes
    interface ElementAttributesProperty {
      props: {};
    }

    // Children
    interface ElementChildrenAttribute {
      children: {};
    }
  }
}
