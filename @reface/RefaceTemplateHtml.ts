import type {
  ElementChildType,
  IRefaceRenderManager,
  IRefaceTemplate,
} from "@reface/types";

/**
 * Represents pre-rendered HTML content.
 * Used for raw HTML strings and template literals.
 *
 * @implements {IRefaceTemplate}
 *
 * @example
 * // Raw HTML content
 * new TemplateHtml([new TemplateText("<div>content</div>")]);
 *
 * // Used by html template literal
 * html`<div>${value}</div>`;
 */
export class RefaceTemplateHtml implements IRefaceTemplate {
  public type = "html";
  children: ElementChildType[];

  constructor(children: ElementChildType[]) {
    this.children = children;
  }

  toHtml(manager: IRefaceRenderManager): string {
    return manager.renderChildren(this.children);
  }
}
