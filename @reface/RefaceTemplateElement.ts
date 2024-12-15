import type {
  ElementChildType,
  HTMLAttributes,
  IRefaceRenderManager,
  IRefaceTemplateElement,
} from "@reface/types";
import { VOID_ELEMENTS } from "./constants.ts";

export type IRefaceTemplateElementOptions = {
  tag?: string;
  attributes?: HTMLAttributes;
  children?: ElementChildType[];
  payload?: Record<string, unknown>;
};

/**
 * Represents an HTML element in the template system.
 * Handles rendering of HTML tags, attributes and children.
 *
 * @implements {IRefaceTemplateElement}
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
export class RefaceTemplateElement implements IRefaceTemplateElement {
  public type = "element";
  public tag: string;
  public attributes: HTMLAttributes;
  public children: ElementChildType[];
  public payload: Record<string, unknown>;

  constructor(options: IRefaceTemplateElementOptions) {
    this.tag = options.tag || "div";
    this.attributes = options.attributes || {};
    this.children = options.children || [];
    this.payload = options.payload || {};
  }

  toHtml(manager: IRefaceRenderManager): string {
    const attrs = manager.renderAttributes(this.attributes);

    if (VOID_ELEMENTS.has(this.tag)) {
      return `<${this.tag}${attrs ? ` ${attrs}` : ""}/>`;
    }

    const content = manager.renderChildren(this.children);
    return `<${this.tag}${attrs ? ` ${attrs}` : ""}>${content}</${this.tag}>`;
  }
}
