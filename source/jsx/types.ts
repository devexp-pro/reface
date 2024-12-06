import type { Template } from "../types.ts";
import type { ElementChild } from "../types/base.ts";
import type {
  HTMLAttributes,
  EventAttributes,
  HtmxAttributes,
  AriaAttributes,
} from "../types/mod.ts";

// Base props interface
export interface JSXProps
  extends HTMLAttributes,
    EventAttributes,
    HtmxAttributes,
    AriaAttributes {
  children?: ElementChild | ElementChild[];
  innerHTML?: string;
  [key: `data-${string}`]: string | number | boolean | undefined;
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
      form: JSXProps;
      input: JSXProps;
      button: JSXProps;
      textarea: JSXProps;
      select: JSXProps;
      option: JSXProps;
      label: JSXProps;

      // Links
      a: JSXProps & { href?: string };

      // Lists
      ul: JSXProps;
      ol: JSXProps;
      li: JSXProps;

      // Tables
      table: JSXProps;
      thead: JSXProps;
      tbody: JSXProps;
      tr: JSXProps;
      th: JSXProps;
      td: JSXProps;

      // Media
      img: JSXProps & { src: string; alt: string };
      video: JSXProps;
      audio: JSXProps;
    }
  }
}
