import type { EmptyRecord } from "@common/utility.types.ts";

import type {
  ElementNode,
  HTMLAttributes,
  HTMLElementTagAttributes,
} from "@recast/expressions";

export type ElementFn = {
  <
    P extends HTMLAttributes = HTMLAttributes,
    E extends Record<string, any> = EmptyRecord,
    Tag extends keyof HTMLElementTagAttributes = keyof HTMLElementTagAttributes,
  >(
    tag: Tag,
  ): ElementNode<
    Tag extends keyof HTMLElementTagAttributes ? HTMLElementTagAttributes[Tag]
      : P,
    E
  >;
};

export type Element =
  & {
    <
      P extends HTMLAttributes = HTMLAttributes,
      E extends Record<string, any> = EmptyRecord,
      Tag extends string = string,
    >(
      tag: Tag,
    ): ElementNode<
      Tag extends keyof HTMLElementTagAttributes ? HTMLElementTagAttributes[Tag]
        : P,
      E
    >;
  }
  & {
    [Tag in keyof HTMLElementTagAttributes]: ElementNode<
      HTMLElementTagAttributes[Tag]
    >;
  };
