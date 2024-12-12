import { createLogger } from "@reface/core";

import type { HTMLAttributes, TemplateAttributes } from "./types.ts";
import { HTML_ENTITIES } from "./constants.ts";
import { escapeAttribute } from "./escape.ts";
import { processHTMLAttributes } from "./utils.ts";

const logger = createLogger("HTML:Attributes");

/**
 * Convert attributes to string for HTML
 */
export function renderAttributes(attrs: Record<string, unknown> = {}): string {
  logger.debug("Rendering attributes", {
    count: Object.keys(attrs).length,
  });

  try {
    const parts: string[] = [];

    for (const [key, value] of Object.entries(attrs)) {
      if (value == null) {
        logger.debug(`Skipping null attribute "${key}"`);
        continue;
      }

      if (key === "class" && Array.isArray(value)) {
        if (value.length > 0) {
          const className = value.join(" ").split(" ").join(" ");
          logger.debug("Rendering class attribute", {
            classes: value,
            result: className,
          });
          parts.push(`class="${escapeAttribute(className)}"`);
        }
      } else if (key === "style") {
        if (typeof value === "string") {
          logger.debug("Rendering style string", { value });
          parts.push(`style="${escapeAttribute(value)}"`);
        } else if (typeof value === "object") {
          const style = Object.entries(value)
            .map(([k, v]) => `${toKebabCase(k)}: ${v}`)
            .join("; ");
          logger.debug("Rendering style object", {
            input: value,
            output: style,
          });
          parts.push(`style="${escapeAttribute(style)}"`);
        }
      } else if (typeof value === "boolean") {
        if (value) {
          logger.debug(`Rendering boolean attribute "${key}"`);
          parts.push(key);
        }
      } else {
        logger.debug(`Rendering attribute "${key}"`, { value });
        parts.push(`${key}="${escapeAttribute(String(value))}"`);
      }
    }

    const result = parts.length ? " " + parts.join(" ") : "";

    logger.info("Rendered attributes", {
      inputCount: Object.keys(attrs).length,
      outputParts: parts.length,
      length: result.length,
    });

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to render attributes", error, { attrs });
    } else {
      logger.error(
        "Unknown error rendering attributes",
        new Error(String(error)),
        { attrs },
      );
    }
    throw error;
  }
}

/**
 * Converts camelCase to kebab-case
 * marginBottom -> margin-bottom
 */
function toKebabCase(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
