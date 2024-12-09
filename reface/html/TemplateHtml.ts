import { createLogger } from "@reface/core";
import { TemplateBase } from "./TemplateBase.ts";
import type { ElementChildType } from "./types.ts";
import type { RenderContext } from "./render.ts";
import { escapeHTML } from "./escape.ts";

const logger = createLogger("HTML:Html");

export class TemplateHtml {
  constructor(public readonly children: ElementChildType[]) {
    logger.debug("Creating HTML template", { childrenCount: children.length });
  }

  toHtml(context: RenderContext): string {
    return this.children.map((child) =>
      "toHtml" in child ? child.toHtml(context) : escapeHTML(String(child))
    ).join("");
  }
}
