import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";
import { ITemplate } from "./types.ts";
import { escapeHTML } from "./escape.ts";
import { TemplateText } from "./TemplateText.ts";

const logger = createLogger("HTML:Fragment");

/**
 * Fragment template - группирует элементы без создания родительского элемента
 */
export class TemplateFragment implements ITemplate {
  private readonly children: ElementChildType[];

  constructor(children: ElementChildType[] = []) {
    this.children = children;
    logger.debug("Creating fragment", { childrenCount: children.length });
  }

  toHtml(): string {
    return this.children.map((child) => {
      if (typeof child === "object" && child !== null && "toHtml" in child) {
        return child.toHtml();
      }
      if (typeof child === "string") {
        return escapeHTML(child);
      }
      if (child instanceof TemplateText) {
        return child.toHtml();
      }
      return escapeHTML(String(child));
    }).join("");
  }

  // Для отладки
  [Symbol.for("Deno.customInspect")](indent = "") {
    if (!this.children.length) return "<></> // [TemplateFragment]";

    const childIndent = `${indent}  `;
    const children = this.children
      .map((child) => {
        if (child === null || child === undefined) return "";
        if (typeof child === "string") {
          return child.length > 40
            ? `${childIndent}"${child.slice(0, 40)}..."`
            : `${childIndent}"${child}"`;
        }
        return `${childIndent}${child}`;
      })
      .filter(Boolean)
      .join("\n");

    return `<>\n${children}\n${indent}</> // [TemplateFragment]`;
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this[Symbol.for("Deno.customInspect")]();
  }

  toJSON() {
    return {
      type: "TemplateFragment",
      children: this.children,
    };
  }
}
