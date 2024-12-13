import type { ComponentProps, ElementChildType, ITemplate } from "../types.ts";

declare global {
  namespace JSX {
    type Element = ITemplate;

    interface ElementChildrenAttribute {
      children: ElementChildType | ElementChildType[];
    }

    interface IntrinsicElements {
      [elemName: string]: ComponentProps;
    }
  }
}
