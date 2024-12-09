import { createLogger } from "@reface/core";
import { escapeHTML } from "./escape.ts";
import type { RenderContext } from "./render.ts";

const logger = createLogger("HTML:Text");

export class TemplateText {
  private escaped: string | null = null;

  constructor(
    public readonly content: string,
    public readonly trusted: boolean = false,
  ) {
    logger.debug("Creating text node", { length: content.length });
  }

  toHtml(_context: RenderContext): string {
    if (this.trusted) {
      return this.content;
    }
    if (this.escaped === null) {
      this.escaped = escapeHTML(this.content);
    }
    return this.escaped;
  }

  static from(value: unknown): TemplateText {
    return new TemplateText(String(value));
  }
}
