// deno-lint-ignore-file no-namespace
import type {
  Child,
  Children,
  Element as RecastElement,
  HTMLAttributes,
  HTMLElementTagAttributes,
} from "@recast/expressions";

type WithChildren = {
  children?: Children | Child;
};

export namespace JSX {
  export type Element = RecastElement;

  export interface ElementChildrenAttribute {
    children: Children | Child;
  }

  export interface IntrinsicAttributes {
    key?: string | number | null | undefined;
    children?: Children | Child;
  }

  export interface IntrinsicElements {
    head: HTMLAttributes & WithChildren;
    title: HTMLAttributes & WithChildren;
    link: HTMLElementTagAttributes["HTMLLinkAttributes"];
    meta: HTMLElementTagAttributes["HTMLMetaAttributes"];
    style: HTMLElementTagAttributes["HTMLStyleAttributes"] & WithChildren;
    article:
      & HTMLElementTagAttributes["HTMLSectioningAttributes"]
      & WithChildren;
    section:
      & HTMLElementTagAttributes["HTMLSectioningAttributes"]
      & WithChildren;
    nav: HTMLElementTagAttributes["HTMLSectioningAttributes"] & WithChildren;
    aside: HTMLElementTagAttributes["HTMLSectioningAttributes"] & WithChildren;
    header: HTMLElementTagAttributes["HTMLHeaderAttributes"] & WithChildren;
    footer: HTMLElementTagAttributes["HTMLFooterAttributes"] & WithChildren;
    form: HTMLElementTagAttributes["HTMLFormAttributes"] & WithChildren;
    label: HTMLElementTagAttributes["HTMLLabelAttributes"] & WithChildren;
    input: HTMLElementTagAttributes["HTMLInputAttributes"];
    button: HTMLElementTagAttributes["HTMLButtonAttributes"] & WithChildren;
    select: HTMLElementTagAttributes["HTMLSelectAttributes"] & WithChildren;
    textarea: HTMLElementTagAttributes["HTMLTextareaAttributes"] & WithChildren;
    div: HTMLAttributes & WithChildren;
    span: HTMLAttributes & WithChildren;
    a: HTMLElementTagAttributes["HTMLAnchorAttributes"] & WithChildren;
    img: HTMLElementTagAttributes["HTMLImgAttributes"];
    area: HTMLElementTagAttributes["HTMLAreaAttributes"];
    br: HTMLElementTagAttributes["HTMLBrAttributes"];
    col: HTMLElementTagAttributes["HTMLColAttributes"];
    hr: HTMLElementTagAttributes["HTMLHrAttributes"];
    source: HTMLElementTagAttributes["HTMLSourceAttributes"];
    track: HTMLElementTagAttributes["HTMLTrackAttributes"];
    wbr: HTMLElementTagAttributes["HTMLWbrAttributes"];
    [tagName: string]:
      & HTMLElementTagAttributes[keyof HTMLElementTagAttributes]
      & WithChildren;
  }
}
