// @reface/elementFactory.ts
import type { ElementFactoryFn } from "@reface/types";
import { RefaceTemplateElement } from "@reface";
import { getChildren } from "./utils/getChildren.ts";

/**
 * Creates a template function for HTML elements with template literal support.
 *
 * @param tag - HTML tag name
 * @returns Function that accepts attributes and returns a template literal function
 *
 * @example
 * const customDiv = elementFactory('div');
 *
 * // Usage with template literals
 * customDiv({ class: 'container' })`
 *   ${span({ class: 'text' })`Hello`}
 * `;
 *
 * // Predefined elements
 * div({ class: 'container' })`content`;
 * span({ id: 'text' })`text content`;
 */
export const elementFactory: ElementFactoryFn = (tag) => {
  return (attrs = {}) => {
    return (strings = Object.assign([], { raw: [] }), ...values) => {
      return new RefaceTemplateElement({
        tag,
        attributes: attrs,
        children: getChildren(strings, values),
      });
    };
  };
};
