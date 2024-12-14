import type { ElementChildType, ITemplate } from "./types.ts";
import { TemplateElement } from "./templates/TemplateElement.ts";

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
  // Создаем функцию элемента с поддержкой обоих вариантов вызова
  const elementFn = (
    attributes: Record<string, unknown> = {},
    children?: ElementChildType[],
  ) => {
    if (children) {
      // Прямой вызов с children
      return new TemplateElement({
        tag,
        attributes,
        children,
      });
    }

    // Возвращаем функцию для template literals
    return (
      strings: TemplateStringsArray = [],
      ...values: ElementChildType[]
    ) => {
      const templateChildren = [];
      for (let i = 0; i < strings.length; i++) {
        if (strings[i].trim()) {
          templateChildren.push(strings[i]);
        }
        if (i < values.length) {
          templateChildren.push(values[i]);
        }
      }
      return new TemplateElement({
        tag,
        attributes,
        children: templateChildren,
      });
    };
  };

  return elementFn;
}
