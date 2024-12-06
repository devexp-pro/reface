import type { ElementChild } from "../types/base.ts";
import type { Attributes } from "../types/mod.ts";
import type { Template } from "../types.ts";

/**
 * Creates an element factory function for a given tag
 * @param tag HTML tag name
 * @returns Element factory function
 */
export function createElementFactory<A extends Attributes = Attributes>(
  tag: string
) {
  return (attributes?: A) =>
    (strings: TemplateStringsArray, ...values: ElementChild[]): Template => {
      return {
        tag,
        attributes: attributes ? attributes.toString() : "",
        children: values,
        css: "",
        isTemplate: true,
        str: strings,
        args: values,
        rootClass: "",
      };
    };
}
