import { createLogger } from "@reface/core";
import type { ElementChildType, IHTMLAttributes } from "./types.ts";
import { TemplateBase } from "./TemplateBase.ts";
import { processAttributes } from "./attributes.ts";
import { TemplateText } from "./TemplateText.ts";
import { TemplateFragment } from "./TemplateFragment.ts";
import { TemplateHtml } from "./TemplateHtml.ts";
import { ITemplate } from "./types.ts";
import { renderAttributes } from "./attributes.ts";
import { VOID_ELEMENTS } from "./constants.ts";
import { escapeHTML } from "./escape.ts";
import { RenderContext } from "./render.ts";

const logger = createLogger("HTML:Template");

/**
 * HTML template class
 */
export class Template implements ITemplate {
  constructor(
    private readonly options: {
      tag: string;
      attributes?: Record<string, unknown>;
      children?: ElementChild[];
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

  readonly tag: string;
  readonly attributes: Record<string, unknown>;
  readonly children: ElementChild[];
  readonly css?: string;
  readonly rootClass?: string;

  toHtml(context: RenderContext): string {
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

      if (typeof child === "string") {
        return escapeHTML(child);
      }
      if (child instanceof TemplateText) {
        return child.toHtml();
      }
      return escapeHTML(String(child));
    }).join("");

    return `<${this.tag}${attrs}>${children}</${this.tag}>`;
  }
}
