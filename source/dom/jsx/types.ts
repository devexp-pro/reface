import type { Template } from "../../types.ts";
import type { ElementChild } from "../types/base.ts";
import type {
  HTMLAttributes,
  EventAttributes,
  HtmxAttributes,
} from "../types/mod.ts";

export interface JSXProps
  extends HTMLAttributes,
    EventAttributes,
    HtmxAttributes {
  children?: ElementChild[];
  [key: `data-${string}`]: string | number | boolean | undefined;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: JSXProps;
      button: JSXProps;
      span: JSXProps;
      aside: JSXProps;
      main: JSXProps;
      nav: JSXProps;
      a: JSXProps;
      h1: JSXProps;
      p: JSXProps;
    }
  }
}
