import type {
  ElementChildType,
  IRefaceRenderManager,
  IRefaceTemplate,
} from "@reface/types";

/**
 * Represents a group of templates without adding extra HTML elements.
 * Used for JSX Fragments and grouping multiple elements.
 *
 * @implements {IRefaceTemplate}
 *
 * @example
 * // Basic fragment
 * new TemplateFragment([
 *   new TemplateText('First'),
 *   new TemplateText('Second')
 * ]);
 *
 * // Used by JSX Fragment
 * <>
 *   <div>First</div>
 *   <div>Second</div>
 * </>;
 */
export class RefaceTemplateFragment implements IRefaceTemplate {
  public type = "fragment";
  public children: ElementChildType[];

  constructor(children: ElementChildType[] = []) {
    this.children = children;
  }

  toHtml(manager: IRefaceRenderManager): string {
    return manager.renderChildren(this.children);
  }
}
