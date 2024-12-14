import type { ElementChildType, IRenderManager, ITemplate } from "../types.ts";

/**
 * Represents pre-rendered HTML content.
 * Used for raw HTML strings and template literals.
 *
 * @implements {ITemplate}
 *
 * @example
 * // Raw HTML content
 * new TemplateHtml([new TemplateText("<div>content</div>")]);
 *
 * // Used by html template literal
 * html`<div>${value}</div>`;
 */
export class TemplateHtml implements ITemplate {
  public type = "html";
  children: ElementChildType[];

  constructor(children: ElementChildType[]) {
    this.children = children;
  }

  toHtml(manager: IRenderManager): string {
    return manager.renderChildren(this.children);
  }
}
