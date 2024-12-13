import type { ElementChildType, ITemplateElement } from "./types.ts";
import type { IRenderManager } from "../render/types.ts";
import { VOID_ELEMENTS } from "../constants.ts";

export interface ITemplateElementOptions {
  tag?: string;
  attributes?: Record<string, unknown>;
  children?: ElementChildType[];
}

/**
 * Represents an HTML element in the template system.
 * Handles rendering of HTML tags, attributes and children.
 *
 * @implements {ITemplateElement}
 *
 * @example
 * // Basic element
 * new TemplateElement({
 *   tag: 'div',
 *   attributes: { class: 'container' },
 *   children: ['content']
 * });
 *
 * // Void element
 * new TemplateElement({
 *   tag: 'img',
 *   attributes: { src: 'image.jpg' }
 * });
 *
 * // Nested elements
 * new TemplateElement({
 *   tag: 'div',
 *   children: [
 *     new TemplateElement({ tag: 'span', children: ['nested'] })
 *   ]
 * });
 */
export class TemplateElement implements ITemplateElement {
  public tag: string;
  public attributes: Record<string, unknown>;
  public children: ElementChildType[];

  constructor(options: ITemplateElementOptions) {
    this.tag = options.tag || "div";
    this.attributes = options.attributes || {};
    this.children = options.children || [];
  }

  toHtml(manager: IRenderManager): string {
    const attrs = manager.renderAttributes(this.attributes);

    if (VOID_ELEMENTS.has(this.tag)) {
      return `<${this.tag}${attrs ? ` ${attrs}` : ""}/>`;
    }

    const content = manager.renderChildren(this.children);
    return `<${this.tag}${attrs ? ` ${attrs}` : ""}>${content}</${this.tag}>`;
  }
}
