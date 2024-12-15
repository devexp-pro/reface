import type {
  ComponentProps,
  ElementChildType,
  IRefaceTemplate,
} from "@reface/types";

declare global {
  namespace JSX {
    type Element = IRefaceTemplate;

    interface ElementChildrenAttribute {
      children: ElementChildType | ElementChildType[];
    }

    interface IntrinsicElements {
      [elemName: string]: ComponentProps;
    }
  }
}
