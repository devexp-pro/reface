import { createLogger } from "@reface/core";

const logger = createLogger("Elements:JS");

/**
 * JavaScript template literal tag
 */
export function js(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  logger.debug("Processing JS template", {
    stringsCount: strings.length,
    valuesCount: values.length,
  });

  try {
    const result = strings.reduce((acc, str, i) => {
      acc += str;
      if (i < values.length) {
        const value = values[i];
        acc += String(value);
      }
      return acc;
    }, "");

    logger.debug("JS template processed", {
      resultLength: result.length,
    });

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to process JS template", error, {
        strings,
        values,
      });
    } else {
      logger.error(
        "Unknown error processing JS template",
        new Error(String(error)),
        { strings, values }
      );
    }
    throw error;
  }
}
