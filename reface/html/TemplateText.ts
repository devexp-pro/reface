import { createLogger } from "@reface/core";
import { escapeHTML } from "./escape.ts";
import type { ElementChildType } from "./types.ts";

const logger = createLogger("HTML:Text");

/**
 * Text template for safe text content
 */
export class TemplateText {
  constructor(public readonly content: string) {
    logger.debug("Creating text node", { length: content.length });
  }

  getContent(): string {
    return this.content;
  }

  toString(): string {
    return this.content;
  }

  static from(value: ElementChildType): TemplateText {
    if (value == null) {
      return new TemplateText("");
    }
    return new TemplateText(String(value));
  }
}
