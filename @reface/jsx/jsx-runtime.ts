import type {
  BaseAttributes,
  ComponentFn,
  ElementChildType,
  Template,
  TemplatePayload,
} from "@reface/template";
import { createElement } from "./createElement.ts";
import type * as HTML from "../types/elements.types.ts";

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

type WithChildren = {
  children?: ElementChildType | ElementChildType[];
};

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
    // Document Metadata
    head: HTML.HTMLAttributes & WithChildren;
    title: HTML.HTMLAttributes & WithChildren;
    base: HTML.HTMLAttributes; // void element
    link: HTML.HTMLLinkAttributes; // void element
    meta: HTML.HTMLMetaAttributes; // void element
    style: HTML.HTMLStyleAttributes & WithChildren;

    // Content Sectioning
    article: HTML.HTMLSectioningAttributes & WithChildren;
    section: HTML.HTMLSectioningAttributes & WithChildren;
    nav: HTML.HTMLSectioningAttributes & WithChildren;
    aside: HTML.HTMLSectioningAttributes & WithChildren;
    header: HTML.HTMLHeaderAttributes & WithChildren;
    footer: HTML.HTMLFooterAttributes & WithChildren;

    // Forms
    form: HTML.HTMLFormAttributes & WithChildren;
    label: HTML.HTMLLabelAttributes & WithChildren;
    input: HTML.HTMLInputAttributes; // void element
    button: HTML.HTMLButtonAttributes & WithChildren;
    select: HTML.HTMLSelectAttributes & WithChildren;
    textarea: HTML.HTMLTextareaAttributes & WithChildren;

    // Generic Elements
    div: HTML.HTMLAttributes & WithChildren;
    span: HTML.HTMLAttributes & WithChildren;

    // Anchors
    a: HTML.HTMLAnchorAttributes & WithChildren;

    // Images
    img: HTML.HTMLImgAttributes; // void element

    // Другие void elements
    area: HTML.HTMLAttributes;
    br: HTML.HTMLAttributes;
    col: HTML.HTMLAttributes;
    hr: HTML.HTMLAttributes;
    source: HTML.HTMLSourceAttributes;
    track: HTML.HTMLAttributes;
    wbr: HTML.HTMLAttributes;
  }
}
