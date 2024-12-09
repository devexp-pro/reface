import { createLogger } from "@reface/core";
import { TemplateBase } from "./TemplateBase.ts";
import { Template } from "./Template.ts";
import type { ElementChildType } from "./types.ts";

const logger = createLogger("HTML:Html");

/**
 * HTML template для создания из строковых литералов
 */
export class TemplateHtml extends TemplateBase {
  constructor(content: ElementChildType | ElementChildType[]) {
    super({
      tag: "html",
      children: Array.isArray(content) ? content : [content],
    });
  }

  toString(): string {
    return this.children[0] as string;
  }

  /**
   * Создать из template literal
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
        } else if (Array.isArray(value)) {
          result += value.map(String).join("");
        } else {
          result += String(value);
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

  static isHtml(value: unknown): value is TemplateHtml {
    return value instanceof TemplateHtml;
  }
}
