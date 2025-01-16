import type { EmptyRecord } from "@common/utility.types.ts";

import type { Element, ElementFn } from "./types.ts";
import type { HTMLElementTagAttributes } from "@recast/expressions";
import { elementExpression, type HTMLAttributes } from "@recast/expressions";

const elementFn: ElementFn = <
  P extends HTMLAttributes = HTMLAttributes,
  E extends Record<string, any> = EmptyRecord,
  Tag extends keyof HTMLElementTagAttributes = keyof HTMLElementTagAttributes,
>(
  tag: Tag,
) => elementExpression.create({ tag: tag as string });

/**
 * Creates HTML elements with type-safe attributes
 *
 * @example
 * // Standard HTML elements
 * element.div({ class: "container" })
 * element.a({ href: "/home" })
 *
 * @example
 * // Custom elements with typed attributes
 * interface CustomAttrs extends HTMLAttributes {
 *   customProp: string;
 * }
 * element<CustomAttrs>("custom-element")
 */
export const element = new Proxy(elementFn, {
  get(target, prop) {
    if (typeof prop === "string") {
      return elementFn(prop);
    }
    return target[prop as keyof typeof target];
  },
}) as Element;
