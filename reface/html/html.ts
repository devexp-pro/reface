import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";
import { Template } from "./Template.ts";
import { TemplateText } from "./TemplateText.ts";
import { TemplateHtml } from "./TemplateHtml.ts";
import { render } from "./render.ts";

const logger = createLogger("HTML:Html");

/**
 * Creates a HTML template
 */
export function html(
  strings: TemplateStringsArray | string,
  ...values: ElementChildType[]
): TemplateHtml {
  logger.debug("Creating HTML from template literal", {
    isTemplateString: Array.isArray(strings),
    valuesCount: values.length,
  });

  try {
    // Если передана просто строка (не template literal)
    if (typeof strings === "string") {
      return new TemplateHtml(strings);
    }

    // Обработка template literal
    let result = strings[0];
    for (let i = 0; i < values.length; i++) {
      const value = values[i];

      if (value === null || value === undefined) {
        result += "";
      } else if (value instanceof Template) {
        // Template и TemplateHtml считаются безопасными
        result += render(value);
      } else if (value instanceof TemplateHtml) {
        result += value.toString();
      } else {
        // Все остальные значения (строки, числа и т.д.) экранируются
        result += new TemplateText(String(value)).toString();
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
