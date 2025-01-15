// deno-lint-ignore-file no-namespace
import type {
  ElementChildType,
  Template,
  TemplatePayload,
} from "@reface/template";

import type * as HTML from "@recast/types/elements.types.ts";

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
    head: HTML.HTMLAttributes & WithChildren;
    title: HTML.HTMLAttributes & WithChildren;
    base: HTML.HTMLAttributes;
    link: HTML.HTMLLinkAttributes;
    meta: HTML.HTMLMetaAttributes;
    style: HTML.HTMLStyleAttributes & WithChildren;
    article: HTML.HTMLSectioningAttributes & WithChildren;
    section: HTML.HTMLSectioningAttributes & WithChildren;
    nav: HTML.HTMLSectioningAttributes & WithChildren;
    aside: HTML.HTMLSectioningAttributes & WithChildren;
    header: HTML.HTMLHeaderAttributes & WithChildren;
    footer: HTML.HTMLFooterAttributes & WithChildren;
    form: HTML.HTMLFormAttributes & WithChildren;
    label: HTML.HTMLLabelAttributes & WithChildren;
    input: HTML.HTMLInputAttributes;
    button: HTML.HTMLButtonAttributes & WithChildren;
    select: HTML.HTMLSelectAttributes & WithChildren;
    textarea: HTML.HTMLTextareaAttributes & WithChildren;
    div: HTML.HTMLAttributes & WithChildren;
    span: HTML.HTMLAttributes & WithChildren;
    a: HTML.HTMLAnchorAttributes & WithChildren;
    img: HTML.HTMLImgAttributes;
    area: HTML.HTMLAttributes;
    br: HTML.HTMLAttributes;
    col: HTML.HTMLAttributes;
    hr: HTML.HTMLAttributes;
    source: HTML.HTMLSourceAttributes;
    track: HTML.HTMLAttributes;
    wbr: HTML.HTMLAttributes;
    [tagName: string]: HTML.HTMLAttributes & WithChildren;
  }
}
