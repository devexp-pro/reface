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
  props: P | null,
  _key?: string,
) => Template<P, T>;

export const jsx: JsxFn = function <
  P extends BaseAttributes,
  T extends TemplatePayload,
>(
  tag: string | ComponentFn<P, T> | Template<P, T>,
  props: P | null,
  _key?: string,
): Template<P, T> {
  if (!props || !("children" in props)) {
    return createElement(tag, props, []) as unknown as Template<P, T>;
  }

  const { children, ...rest } =
    props as (P & { children?: ElementChildType | ElementChildType[] });
  const normalizedChildren = Array.isArray(children) ? children : [children];

  return createElement(
    tag,
    rest as P,
    ...normalizedChildren,
  ) as unknown as Template<P, T>;
};

export const jsxs = jsx;
export const jsxDEV = jsx;

export { Fragment } from "./Fragment.ts";

export namespace JSX {
  export type Element = Template<any, TemplatePayload>;

  export interface ElementChildrenAttribute {
    children: ElementChildType | ElementChildType[];
  }

  export interface IntrinsicAttributes {
    key?: string | number | null | undefined;
    children?: ElementChildType | ElementChildType[];
  }

  export interface IntrinsicElements {
    [tagName: string]: BaseAttributes & {
      children?: ElementChildType | ElementChildType[];
      key?: string | number | null | undefined;
    };
  }
}
