import type {
  BaseAttributes,
  ComponentFn,
  Template,
  TemplatePayload,
} from "@reface/recast";
import { createElement } from "./createElement.ts";

type JsxFn = <
  P extends BaseAttributes,
  T extends TemplatePayload = TemplatePayload,
>(
  tag: string | ComponentFn<P> | Template<P, T>,
  props: P | null,
  _key?: string,
) => Template<P, T>;

export const jsx: JsxFn = function <
  P extends BaseAttributes,
  T extends TemplatePayload,
>(
  tag: string | ComponentFn<P> | Template<P, T>,
  { children = [], ...attrs }: P,
  key?: string,
): Template<P, T> {
  if (key) {
    attrs.key = key;
  }

  return createElement(
    tag,
    attrs as P,
    ...(Array.isArray(children) ? children : [children]),
  ) as unknown as Template<P, T>;
};

export const jsxs = jsx;
export const jsxDEV = jsx;

export { Fragment } from "./Fragment.ts";
export * from "./jsx.namespace.ts";
