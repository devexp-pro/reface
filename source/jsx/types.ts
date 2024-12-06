import type { HTMLAttributes } from "../core/Template.ts";

// HTML Element Attributes
export interface HTMLElementAttributes extends HTMLAttributes {
  ref?: any;
  key?: string | number;
  dangerouslySetInnerHTML?: { __html: string };
  children?:
    | string
    | number
    | boolean
    | null
    | undefined
    | Element
    | Array<Element>;
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
      // Document structure
      p: HTMLElementAttributes;
      main: HTMLElementAttributes;
      header: HTMLElementAttributes;
      nav: HTMLElementAttributes;

      // Media
      img: HTMLElementAttributes & {
        src?: string;
        alt?: string;
      };

      // Typography
      h1: HTMLElementAttributes;
      h2: HTMLElementAttributes;
      h3: HTMLElementAttributes;
      h4: HTMLElementAttributes;

      // Links
      a: HTMLElementAttributes & {
        href?: string;
      };

      // Lists
      ul: HTMLElementAttributes;
      li: HTMLElementAttributes;
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
