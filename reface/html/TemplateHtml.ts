import { createLogger } from "@reface/core";
import { TemplateBase } from "./TemplateBase.ts";
import { Template } from "./Template.ts";
import type { ElementChildType } from "./types.ts";
import { ITemplate } from "./types.ts";

const logger = createLogger("HTML:Html");

/**
 * HTML template для создания из строковых литералов
 */
export class TemplateHtml implements ITemplate {
  constructor(public readonly children: ElementChildType[]) {
    logger.debug("Creating HTML template", { childrenCount: children.length });
  }

  toHtml(): string {
    return this.children.map((child) =>
      "toHtml" in child ? child.toHtml() : escapeHTML(String(child))
    ).join("");
  }
}
