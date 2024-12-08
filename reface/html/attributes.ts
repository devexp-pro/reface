import { createLogger } from "@reface/core";

import type { HTMLAttributes, TemplateAttributes } from "./types.ts";
import { HTML_ENTITIES } from "./constants.ts";
import { escapeAttribute } from "./escape.ts";
import { processHTMLAttributes } from "./utils.ts";

const logger = createLogger("HTML");

/**
 * Convert props to TemplateAttributes
 */
export function processAttributes(
  props: Record<string, unknown>
): TemplateAttributes {
  const result: TemplateAttributes = {};

  for (const [key, value] of Object.entries(props)) {
    // Skip undefined/null/false
    if (value === undefined || value === null || value === false) continue;

    if (key === "class") {
      // Convert class to array
      result.class = Array.isArray(value)
        ? value
        : String(value).split(/\s+/).filter(Boolean);
    } else if (key === "style" && typeof value === "object") {
      // Handle style object
      result.style = value as Record<string, string>;
    } else if (value === true) {
      // Boolean attributes
      result[key] = key;
    } else {
      // Regular values
      result[key] = String(value);
    }
  }

  return result;
}

/**
 * Convert attributes to string for HTML
 */
export function renderAttributes(attrs: TemplateAttributes): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(attrs)) {
    if (value == null) continue;

    if (key === "class" && Array.isArray(value)) {
      if (value.length > 0) {
        parts.push(`class="${escapeAttribute(value.join(" "))}"`);
      }
    } else if (key === "style") {
      if (typeof value === "string") {
        parts.push(`style="${escapeAttribute(value)}"`);
      } else if (typeof value === "object") {
        const style = Object.entries(value)
          .map(([k, v]) => `${k}:${v}`)
          .join(";");
        parts.push(`style="${escapeAttribute(style)}"`);
      }
    } else if (typeof value === "boolean") {
      if (value) parts.push(key);
    } else {
      parts.push(`${key}="${escapeAttribute(String(value))}"`);
    }
  }

  return parts.length ? " " + parts.join(" ") : "";
}
