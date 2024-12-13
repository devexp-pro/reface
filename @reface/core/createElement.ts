import type { TemplateFn } from "./types.ts";
import { TemplateElement } from "./templates/mod.ts";
import { TemplateFn as TemplateFnClass } from "./templates/TemplateFn.ts";

/**
 * Creates a template function for HTML elements with template literal support.
 *
 * @param tag - HTML tag name
 * @returns Function that accepts attributes and returns a template literal function
 *
 * @example
 * // Create custom element
 * const customDiv = createElement('div');
 *
 * // Usage:
 * customDiv({ class: 'container' })`
 *   ${span({ class: 'text' })`Hello`}
 * `;
 *
 * // Predefined elements
 * div({ class: 'container' })`content`;
 * span({ id: 'text' })`text content`;
 */
export function createElement(tag: string) {
  return function (
    attributes: Record<string, unknown> = {},
  ): TemplateFn {
    return new TemplateFnClass((children) =>
      new TemplateElement({
        tag,
        attributes,
        children,
      })
    ).fn;
  };
}
