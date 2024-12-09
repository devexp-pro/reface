import type { ElementChild } from "@reface/html";
import type { TemplateComponent } from "@reface/html";

// JSX типы теперь просто описывают создание TemplateComponent
declare global {
  namespace JSX {
    interface Element extends TemplateComponent {}

    interface IntrinsicElements {
      [elemName: string]: {
        [key: string]: unknown;
        children?: ElementChild[];
      };
    }
  }
}

export type FragmentProps = Record<string, never>;
