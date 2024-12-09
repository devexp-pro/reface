import { createLogger } from "@reface/core";
import { escapeHTML } from "./escape.ts";
import type { RenderContext } from "./context.ts";

const logger = createLogger("HTML:Text");

export class TemplateText {
  private escaped: string | null = null;

  constructor(
    public readonly content: string,
    public readonly trusted: boolean = false,
  ) {
    logger.debug("Creating text node", {
      length: content.length,
      trusted: trusted,
    });
  }

  toHtml(context: RenderContext): string {
    context.depth++;
    logger.debug("Rendering text node", {
      depth: context.depth,
      length: this.content.length,
      trusted: this.trusted,
    });

    let result: string;
    if (this.trusted) {
      result = this.content;
    } else {
      if (this.escaped === null) {
        this.escaped = escapeHTML(this.content);
      }
      result = this.escaped;
    }

    context.depth--;
    return result;
  }

  static from(value: unknown): TemplateText {
    return new TemplateText(String(value));
  }

  // Для отладки
  toString(): string {
    return this.content;
  }

  toJSON() {
    return {
      type: "TemplateText",
      content: this.content,
      trusted: this.trusted,
      escaped: this.escaped,
    };
  }
}
