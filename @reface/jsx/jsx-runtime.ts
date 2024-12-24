import type {
  BaseAttributes,
  ComponentFn,
  ElementChildType,
  Template,
  TemplateAttributes,
  TemplateMethods,
  TemplatePayload,
} from "@reface/template";
import { createElement } from "./createElement.ts";

export const jsx = function <
  P extends BaseAttributes,
  T extends TemplatePayload,
>(
  tag: string | ComponentFn<P, T> | Template<P, T>,
  props: (P & { children?: ElementChildType }) | null,
  _key?: string,
) {
  if (!props || !("children" in props)) {
    return createElement(tag, props, []);
  }
  const { children, ...rest } = props;
  return createElement(
    tag,
    rest as P, // Явно указываем тип
    Array.isArray(children) ? children : [children],
  );
};

export const jsxs = jsx;
export const jsxDEV = jsx;
export { Fragment } from "./Fragment.ts";

export namespace JSX {
  export type Element = Template<any, TemplatePayload>;

  export interface ElementChildrenAttribute {
    children: ElementChildType;
  }

  export interface IntrinsicAttributes {
    key?: string | number | null | undefined;
  }

  export interface IntrinsicElements {
    [tagName: string]: any;
  }
}
