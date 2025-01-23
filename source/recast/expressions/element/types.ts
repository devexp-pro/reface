import type { EmptyRecord } from "@common/utility.types.ts";
import type { Children, ProxyNode } from "../types.ts";
import type { HTMLAttributes } from "./html.types.ts";

export interface NormalizedAttributes {
  class: string[];
  style: Record<string, string>;
  [key: string]:
    | string
    | string[]
    | boolean
    | Record<string, string>
    | undefined;
}

export interface ElementPayload {
  type: "element";
  tag: string;
  attributes: NormalizedAttributes;
  children: Children;
  void: boolean;
  meta: Record<string, unknown>;
  methods: Record<string, any>;
}

export type ElementNode<
  Attrs extends HTMLAttributes = HTMLAttributes,
  Methods extends Record<string, any> = EmptyRecord,
> = ProxyNode<ElementPayload, Attrs, Methods>;
