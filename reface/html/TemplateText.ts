import { createLogger } from "@reface/core";
import { escapeHTML } from "./escape.ts";
import type { ElementChildType } from "./types.ts";
import { ITemplate } from "./types.ts";

const logger = createLogger("HTML:Text");

/**
 * Text template for safe text content
 */
export class TemplateText implements ITemplate {
  constructor(
    public readonly content: string,
    public readonly trusted: boolean = false,
  ) {
    logger.debug("Creating text node", { length: content.length });
  }

  toHtml(): string {
    return this.trusted ? this.content : escapeHTML(this.content);
  }

  static from(value: ElementChildType): TemplateText {
    if (value == null) {
      return new TemplateText("");
    }
    return new TemplateText(String(value));
  }
}
