import { createLogger } from "@reface/core";
import type { Template } from "./types.ts";
import { VOID_ELEMENTS } from "./constants.ts";
import { escapeAttribute } from "./escape.ts";

const logger = createLogger("HTML:Utils");

/**
 * Check if element is a void element
 */
export function isVoidElement(tag: string): boolean {
  const tagLower = tag.toLowerCase();
  const isVoid = VOID_ELEMENTS.has(tagLower);
  logger.debug("Checking if element is void", { tag, isVoid });
  return isVoid;
}

/**
 * Process HTML attributes
 */
export function processHTMLAttributes(attrs: Record<string, unknown>): string {
  logger.debug("Processing HTML attributes", {
    count: Object.keys(attrs).length,
  });

  try {
    const parts: string[] = [];

    for (const [key, value] of Object.entries(attrs)) {
      if (value === undefined || value === null) {
        logger.debug(`Skipping empty attribute "${key}"`);
        continue;
      }
      if (value === true) {
        logger.debug(`Adding boolean attribute "${key}"`);
        parts.push(key);
      } else {
        logger.debug(`Processing attribute "${key}"`, { value });
        parts.push(`${key}="${escapeAttribute(String(value))}"`);
      }
    }

    const result = parts.join(" ");
    logger.info("Processed HTML attributes", {
      inputCount: Object.keys(attrs).length,
      outputCount: parts.length,
      resultLength: result.length,
    });

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to process HTML attributes", error, { attrs });
    } else {
      logger.error(
        "Unknown error processing HTML attributes",
        new Error(String(error)),
        { attrs }
      );
    }
    throw error;
  }
}

/**
 * Clean up HTML output
 */
export function cleanHTML(html: string): string {
  return html.replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
}

/**
 * Generate unique class name
 */
export function generateClassName(): string {
  logger.debug("Generating class name");
  const className = `c${Math.random().toString(36).slice(2, 8)}`;
  logger.debug("Generated class name", { className });
  return className;
}

/**
 * Process CSS with class name
 */
export function processCSS(css: string, className: string): string {
  logger.debug("Processing CSS", { cssLength: css.length, className });

  try {
    // Replace & with class name
    const processed = css.replace(/&/g, `.${className}`);

    logger.info("Processed CSS", {
      originalLength: css.length,
      processedLength: processed.length,
      replacements: (processed.match(new RegExp(className, "g")) || []).length,
    });

    return processed;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to process CSS", error, { css, className });
    } else {
      logger.error("Unknown error processing CSS", new Error(String(error)), {
        css,
        className,
      });
    }
    throw error;
  }
}

/**
 * Combine class names
 */
export function combineClassNames(...classes: (string | undefined)[]): string {
  logger.debug("Combining class names", { count: classes.length });

  const combined = classes.filter(Boolean).join(" ");

  logger.debug("Combined class names", {
    input: classes,
    output: combined,
  });

  return combined;
}
