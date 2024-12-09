import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";
import type { RenderContext } from "./render.ts";
import { escapeHTML } from "./escape.ts";
import type { ITemplate } from "./types.ts";

const logger = createLogger("HTML:Html");

export class TemplateHtml implements ITemplate {
  constructor(public readonly children: ElementChildType[]) {
    logger.debug("Creating HTML template", { childrenCount: children.length });
  }

  toHtml(context: RenderContext): string {
    return this.children.map((child) => {
      if (typeof child === "object" && child !== null && "toHtml" in child) {
        return child.toHtml(context);
      }
      // Экранируем только строки и другие примитивы
      return escapeHTML(String(child));
    }).join("");
  }
}
