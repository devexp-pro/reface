import { createLogger } from "@reface/core";
import { TemplateBase } from "./TemplateBase.ts";
import { escapeHTML } from "./escape.ts";
import { Template } from "./Template.ts";
import { render } from "./render.ts";

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
          result += value.children[0];
        } else if (value instanceof Template) {
          result += render(value);
        } else {
          result += escapeHTML(String(value));
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
}
