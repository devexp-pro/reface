import type { ElementChildType, IElementFactory } from "@reface/types";
import { RefaceTemplateElement } from "@reface";

/**
 * Creates a template function for HTML elements with template literal support.
 *
 * @param tag - HTML tag name
 * @returns Function that accepts attributes and returns a template literal function
 *
 * @example
 * // Create custom element
 * const customDiv = elementFactory('div');
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
export const elementFactory: IElementFactory = (tag: string) => {
  // Создаем функцию элемента с поддержкой обоих вариантов вызова
  const elementFn = (
    attributes: Record<string, unknown> = {},
    children?: ElementChildType[],
  ) => {
    if (children) {
      // Прямой вызов с children
      return new RefaceTemplateElement({
        tag,
        attributes,
        children,
      });
    }

    // Возвращаем функцию для template literals
    return (
      strings: TemplateStringsArray = Object.assign([], { raw: [] }),
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
      return new RefaceTemplateElement({
        tag,
        attributes,
        children: templateChildren,
      });
    };
  };

  return elementFn;
};
