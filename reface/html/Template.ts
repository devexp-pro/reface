import type { ElementChildType, ITemplate } from "./types.ts";
import type { IRenderContext } from "./context.ts";
import { renderAttributes } from "./attributes.ts";
import { VOID_ELEMENTS } from "./constants.ts";
import { escapeHTML } from "./escape.ts";

export class Template implements ITemplate {
  readonly tag: string;
  readonly attributes: Record<string, unknown>;
  readonly children: ElementChildType[];
  readonly css?: string;
  readonly rootClass?: string;

  constructor(
    options: {
      tag: string;
      attributes?: Record<string, unknown>;
      children?: ElementChildType[];
      css?: string;
      rootClass?: string;
    },
  ) {
    this.tag = options.tag;
    this.attributes = options.attributes || {};
    this.children = options.children || [];
    this.css = options.css;
    this.rootClass = options.rootClass;
  }

  toHtml(context: IRenderContext): string {
    if (this.css && this.rootClass) {
      context.addStyle(this.css, this.rootClass);
    }

    const attrs = renderAttributes(this.attributes);

    if (VOID_ELEMENTS.has(this.tag)) {
      return `<${this.tag}${attrs}/>`;
    }

    const children = this.children.map((child) => {
      if (typeof child === "object" && child !== null && "toHtml" in child) {
        return child.toHtml(context);
      }
      return escapeHTML(String(child));
    }).join("");

    return `<${this.tag}${attrs}>${children}</${this.tag}>`;
  }
}
