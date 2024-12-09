import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";
import { Template } from "./Template.ts";
import { TemplateText } from "./TemplateText.ts";
import { TemplateHtml } from "./TemplateHtml.ts";
import { render } from "./render.ts";

const logger = createLogger("HTML:Html");

/**
 * Creates a trusted HTML template
 */
export function html(
  strings: TemplateStringsArray,
  ...values: ElementChildType[]
): TemplateHtml {
  logger.debug("Creating HTML from template literal", {
    stringsCount: strings.length,
    valuesCount: values.length,
  });

  try {
    // Если передан только текст или только значение - считаем доверенным
    if (
      strings.length === 1 ||
      (strings.length === 2 && !strings[0] && !strings[1])
    ) {
      const content = strings.length === 1 ? strings[0] : String(values[0]);
      return new TemplateHtml(content);
    }

    // Если все значения - это html или Template, считаем доверенным
    const allTrusted = values.every(
      (value) =>
        value instanceof Template ||
        value instanceof TemplateHtml ||
        value instanceof TemplateText,
    );

    if (allTrusted) {
      // Собираем HTML строку без экранирования
      let result = strings[0];
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        if (value instanceof Template) {
          result += render(value);
        } else {
          result += String(value);
        }
        result += strings[i + 1];
      }

      return new TemplateHtml(result);
    }

    // Собираем HTML строку с экранированием
    let result = strings[0];
    for (let i = 0; i < values.length; i++) {
      const value = values[i];
      if (value == null) {
        result += "";
      } else if (value instanceof Template) {
        result += render(value);
      } else if (value instanceof TemplateHtml) {
        result += value.toString();
      } else {
        result += TemplateText.from(value).toString();
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
