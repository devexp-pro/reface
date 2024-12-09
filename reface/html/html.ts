import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";
import { Template } from "./Template.ts";
import { TemplateHtml } from "./TemplateHtml.ts";
import { TemplateText } from "./TemplateText.ts";

const logger = createLogger("HTML:Html");

/**
 * Creates a HTML template from template literal or string
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
    // Если передана просто строка - считаем её безопасным HTML
    if (typeof strings === "string") {
      return new TemplateHtml(strings);
    }

    // Для template literal создаем массив из статического HTML и значений
    const result: ElementChildType[] = [];

    // Чередуем статический HTML и значения
    for (let i = 0; i < strings.length; i++) {
      if (strings[i]) {
        result.push(strings[i]);
      }

      if (i < values.length) {
        const value = values[i];
        if (value != null) {
          if (Array.isArray(value)) {
            result.push(...value);
          } else if (
            value instanceof Template ||
            value instanceof TemplateHtml
          ) {
            result.push(value);
          } else {
            // Только динамические значения оборачиваем в TemplateText
            result.push(new TemplateText(String(value)));
          }
        }
      }
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
