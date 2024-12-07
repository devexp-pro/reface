import type { HTMLAttributes, Template } from "../core/types.ts";

declare global {
  namespace JSX {
    type Element = Template;

    interface IntrinsicElements {
      [elemName: string]: Partial<HTMLAttributes>;
    }
  }
}

export {};
