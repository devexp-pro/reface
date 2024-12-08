import { createLogger } from "@reface/core";
import { HTML_ENTITIES } from "./constants.ts";

const logger = createLogger("HTML:Escape");

type HtmlEntity = keyof typeof HTML_ENTITIES;
const HTML_CHARS = /[&<>"']/g;
const ATTR_CHARS = /["&]/g;

/**
 * Check if character is HTML entity
 */
function isHtmlEntity(char: string): char is HtmlEntity {
  return char in HTML_ENTITIES;
}

/**
 * Escape HTML content
 */
export function escapeHTML(str: string): string {
  logger.debug("Escaping HTML content", { length: str.length });

  try {
    const result = str.replace(HTML_CHARS, (char) => {
      if (isHtmlEntity(char)) {
        return HTML_ENTITIES[char];
      }
      logger.warn("Unexpected character in HTML content", { char });
      return char;
    });

    const escapedCount = str.length - result.length;
    if (escapedCount > 0) {
      logger.info("Escaped HTML content", {
        originalLength: str.length,
        escapedChars: escapedCount,
      });
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to escape HTML", error, { str });
    } else {
      logger.error("Unknown error escaping HTML", new Error(String(error)), {
        str,
      });
    }
    throw error;
  }
}

/**
 * Escape HTML attribute
 */
export function escapeAttribute(str: string): string {
  logger.debug("Escaping attribute", { length: str.length });

  try {
    const result = str.replace(ATTR_CHARS, (char) => {
      if (isHtmlEntity(char)) {
        return HTML_ENTITIES[char];
      }
      logger.warn("Unexpected character in attribute", { char });
      return char;
    });

    const escapedCount = str.length - result.length;
    if (escapedCount > 0) {
      logger.info("Escaped attribute", {
        originalLength: str.length,
        escapedChars: escapedCount,
      });
    }

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to escape attribute", error, { str });
    } else {
      logger.error(
        "Unknown error escaping attribute",
        new Error(String(error)),
        { str }
      );
    }
    throw error;
  }
}
