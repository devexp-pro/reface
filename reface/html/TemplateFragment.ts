import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";
import { render } from "./render.ts";
import { Template } from "./Template.ts";
import { TemplateBase } from "./TemplateBase.ts";
import { TemplateText } from "./TemplateText.ts";

const logger = createLogger("Fragment");

/**
 * Fragment template
 */
export class TemplateFragment {
  constructor(public readonly children: ElementChildType[]) {
    logger.debug("Creating fragment", { childrenCount: children.length });
  }

  /**
   * Render fragment to string
   */
  toString(): string {
    logger.debug("Rendering fragment", { childrenCount: this.children.length });
    return this.children.map((child) => {
      if (child == null) {
        return "";
      }

      // Если это Template, используем render
      if (child instanceof Template) {
        return render(child);
      }

      // Если это объект с toString методом
      if (typeof child === "object" && "toString" in child) {
        return child.toString();
      }

      // Для примитивов
      return String(child);
    }).join("");
  }

  /**
   * Get fragment children
   */
  getChildren(): ElementChildType[] {
    return this.children;
  }

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
        if (child instanceof TemplateBase) {
          return `${childIndent}${
            child[Symbol.for("Deno.customInspect")](childIndent)
          }`;
        }
        if (child instanceof TemplateText) {
          return `${childIndent}${child[Symbol.for("Deno.customInspect")]()}`;
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
      children: this.children.map((child) =>
        typeof child === "string" ? `"${child}"` : child
      ),
    };
  }
}
