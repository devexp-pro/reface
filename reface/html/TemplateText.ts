import { createLogger } from "@reface/core";
import { escapeHTML } from "./escape.ts";
import type { ElementChildType } from "./types.ts";

const logger = createLogger("HTML:Text");

/**
 * Text template for safe text content
 */
export class TemplateText {
  private readonly escapedContent: string;

  constructor(public readonly content: string) {
    logger.debug("Creating text node", { length: content.length });
    this.escapedContent = escapeHTML(content);
  }

  /**
   * Convert to string with HTML escaping
   */
  toString(): string {
    logger.debug("Converting text to string", { length: this.content.length });
    return this.escapedContent;
  }

  /**
   * Get raw content
   */
  getContent(): string {
    return this.content;
  }

  /**
   * Create text node from primitive value
   */
  static from(value: ElementChildType): TemplateText {
    if (value == null) {
      return new TemplateText("");
    }
    return new TemplateText(String(value));
  }

  [Symbol.for("Deno.customInspect")]() {
    const preview = this.content.length > 30
      ? `${this.content.slice(0, 30)}...`
      : this.content;
    return `"${preview}" // [TemplateText]`;
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this[Symbol.for("Deno.customInspect")]();
  }

  toJSON() {
    return {
      type: "TemplateText",
      content: this.content,
      escapedContent: this.escapedContent,
    };
  }
}
