import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";

const logger = createLogger("Fragment");

/**
 * Fragment template - группирует элементы без создания родительского элемента
 */
export class TemplateFragment {
  constructor(public readonly children: ElementChildType[]) {
    logger.debug("Creating fragment", { childrenCount: children.length });
  }

  /**
   * Получить дочерние элементы
   */
  getChildren(): ElementChildType[] {
    return this.children;
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
