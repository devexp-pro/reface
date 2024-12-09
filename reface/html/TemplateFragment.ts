import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";
import { ITemplate } from "./types.ts";

const logger = createLogger("Fragment");

/**
 * Fragment template - группирует элементы без создания родительского элемента
 */
export class TemplateFragment implements ITemplate {
  constructor(private readonly children: ElementChildType[]) {
    logger.debug("Creating fragment", { childrenCount: children.length });
  }

  toHtml(): string {
    return this.children.map((child) =>
      "toHtml" in child ? child.toHtml() : escapeHTML(String(child))
    ).join("");
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
