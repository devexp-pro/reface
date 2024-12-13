import { ElementChildType, ITemplate } from "../templates/types.ts";
import { ComponentProps } from "./types.ts";

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
