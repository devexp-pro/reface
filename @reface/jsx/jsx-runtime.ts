import type {
  BaseAttributes,
  ComponentFn,
  ElementChildType,
  Template,
  TemplatePayload,
} from "@reface/template";
import { createElement } from "./createElement.ts";

type JsxFn = <
  P extends BaseAttributes,
  T extends TemplatePayload = TemplatePayload,
>(
  tag: string | ComponentFn<P, T> | Template<P, T>,
  props: (P & { children?: ElementChildType }) | null,
  _key?: string,
) => Template<Omit<P, "children">, T>; // FIXME: find a way to fix this

export const jsx: JsxFn = function <
  P extends BaseAttributes,
  T extends TemplatePayload,
>(
  tag: string | ComponentFn<P, T> | Template<P, T>,
  props: (P & { children?: ElementChildType }) | null,
  _key?: string,
): Template<Omit<P, "children">, T> {
  if (!props || !("children" in props)) {
    return createElement(tag, props, []) as unknown as Template<
      Omit<P, "children">,
      T
    >;
  }
  const { children, ...rest } = props;
  return createElement(
    tag,
    rest as P,
    Array.isArray(children) ? children : [children],
  ) as unknown as Template<Omit<P, "children">, T>;
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
