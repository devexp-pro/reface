import type { ElementChildType, IRenderManager, ITemplate } from "../types.ts";

/**
 * Represents a group of templates without adding extra HTML elements.
 * Used for JSX Fragments and grouping multiple elements.
 *
 * @implements {ITemplate}
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
export class TemplateFragment implements ITemplate {
  public type = "fragment";
  public children: ElementChildType[];

  constructor(children: ElementChildType[] = []) {
    this.children = children;
  }

  toHtml(manager: IRenderManager): string {
    return manager.renderChildren(this.children);
  }
}
