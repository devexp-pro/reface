import type { Template, ElementChild, HTMLAttributes } from "@reface/html";
import type { ComponentFunction, FragmentComponent } from "./types.ts";

// JSX element is always Template
type JSXElement = Template;

// Type for children in JSX
type JSXElementChild = ElementChild;

// Extend HTMLAttributes for JSX
interface JSXAttributes extends HTMLAttributes {
  children?: JSXElementChild | JSXElementChild[];
}

// Type for component props
type ComponentProps<P = object> = P & JSXAttributes;

declare global {
  namespace JSX {
    // Element type
    interface Element extends Template {}

    // Component types
    type ElementType<P = any> =
      | keyof JSX.IntrinsicElements
      | ComponentFunction<P>
      | FragmentComponent;

    // Intrinsic elements
    interface IntrinsicElements extends Record<string, JSXAttributes> {}
  }
}

export type { JSXAttributes, JSXElement, JSXElementChild, ComponentProps };
