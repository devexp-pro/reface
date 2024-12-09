import { createLogger } from "@reface/core";
import { TemplateBase } from "./TemplateBase.ts";
import { Template } from "./Template.ts";
import { render } from "./render.ts";
import { TemplateText } from "./TemplateText.ts";

const logger = createLogger("HTML:Html");

/**
 * HTML template for raw HTML content
 */
export class TemplateHtml extends TemplateBase {
  constructor(content: string) {
    super({
      tag: "html",
      children: [content],
    });
  }

  override toString(): string {
    return this.children[0] as string;
  }

  /**
   * Create from template literal
   */
  static fromTemplateLiteral(
    strings: TemplateStringsArray,
    values: unknown[],
  ): TemplateHtml {
    logger.debug("Creating HTML from template literal", {
      stringsCount: strings.length,
      valuesCount: values.length,
    });

    try {
      let result = strings[0];
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value === null || value === undefined) {
          result += "";
        } else if (value instanceof TemplateHtml) {
          result += value.toString();
        } else if (value instanceof Template) {
          result += render(value);
        } else {
          const text = new TemplateText(String(value));
          result += text.toString();
        }
        result += strings[i + 1];
      }

      return new TemplateHtml(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Failed to create HTML from template", error, {
          strings,
          values,
        });
      } else {
        logger.error(
          "Unknown error creating HTML from template",
          new Error(String(error)),
          { strings, values },
        );
      }
      throw error;
    }
  }

  /**
   * Check if value is TemplateHtml
   */
  static isHtml(value: unknown): value is TemplateHtml {
    return value instanceof TemplateHtml;
  }

  [Symbol.for("Deno.customInspect")]() {
    const content = this.children[0] as string;
    const preview = content.length > 50
      ? `${content.slice(0, 50)}...`
      : content;
    return `<html dangerouslySetInnerHTML="${preview}" /> // [TemplateHtml]`;
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this[Symbol.for("Deno.customInspect")]();
  }

  toJSON() {
    return {
      type: "TemplateHtml",
      content: this.children[0],
      ...(this.css ? { css: "..." } : {}),
      ...(this.script ? { script: "..." } : {}),
    };
  }
}
