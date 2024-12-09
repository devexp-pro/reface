import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";
import { render } from "./render.ts";
import { Template } from "./Template.ts";

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
}
