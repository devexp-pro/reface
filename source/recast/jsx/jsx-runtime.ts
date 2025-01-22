import { createElement } from "./createElement.ts";
import type {
  ComponentNode,
  Element,
  ElementNode,
} from "@recast/expressions/mod.ts";

type BaseAttributes = Record<string, any>;

type JsxFn = <
  P extends BaseAttributes,
>(
  tag: string | ComponentNode<P> | ElementNode<P>,
  props: P,
  _key?: string,
) => Element<P>;

export const jsx: JsxFn = function <
  P extends BaseAttributes,
>(
  tag: string | ComponentNode<P> | ElementNode<P>,
  { children = [], ...attrs }: P,
  key?: string,
): Element<P> {
  if (key) {
    (attrs as any).key = key;
  }

  return createElement(
    tag,
    attrs as any,
    ...(Array.isArray(children) ? children : [children]),
  ) as unknown as Element<P>;
};

export const jsxs = jsx;
export const jsxDEV = jsx;

export { Fragment } from "./Fragment.ts";
export * from "./jsx.namespace.ts";
