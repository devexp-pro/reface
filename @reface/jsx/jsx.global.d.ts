import type {
  ElementChildType,
  Template,
  TemplateAttributes,
} from "@reface/template";

declare global {
  namespace JSX {
    type Element = Template<any, any, any>;
    interface ElementChildrenAttribute {
      children: ElementChildType;
    }
    interface IntrinsicElements {
      [elemName: string]: TemplateAttributes;
    }

    type ElementType =
      | string
      | ((
        props: any,
        children?: ElementChildType[],
      ) => Template<any, any, any>);

    interface IntrinsicAttributes extends Record<string, any> {}
  }
}
