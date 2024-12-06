import type {
  HTMLAttributes,
  ElementChild,
  Template,
  ButtonAttributes,
  InputAttributes,
  FormAttributes,
  AnchorAttributes,
  ImgAttributes,
} from "../types/mod.ts";

// Base JSX Props
export interface JSXProps extends HTMLAttributes {
  children?: ElementChild | ElementChild[];
  innerHTML?: string;
}

// Event handler types
export type JSXEventHandler = string | ((event: Event) => void);

// Element interface
export interface JSXElement extends Template {
  props: JSXProps;
}

// Intrinsic elements declaration
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Document structure
      div: JSXProps;
      span: JSXProps;
      p: JSXProps;
      main: JSXProps;
      section: JSXProps;
      article: JSXProps;
      aside: JSXProps;
      nav: JSXProps;
      header: JSXProps;
      footer: JSXProps;

      // Headings
      h1: JSXProps;
      h2: JSXProps;
      h3: JSXProps;
      h4: JSXProps;
      h5: JSXProps;
      h6: JSXProps;

      // Forms
      form: FormAttributes;
      input: InputAttributes;
      button: ButtonAttributes;
      textarea: JSXProps & {
        rows?: number;
        cols?: number;
      };
      select: JSXProps & {
        multiple?: boolean;
      };
      option: JSXProps & {
        value: string;
        selected?: boolean;
      };
      label: JSXProps;

      // Links
      a: AnchorAttributes;

      // Lists
      ul: JSXProps;
      ol: JSXProps;
      li: JSXProps;

      // Media
      img: ImgAttributes;
      video: JSXProps & {
        src?: string;
        controls?: boolean;
      };
      audio: JSXProps & {
        src?: string;
        controls?: boolean;
      };
    }
  }
}
