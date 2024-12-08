import type { Template } from "./types.ts";
import { VOID_ELEMENTS, SELF_CLOSING_ELEMENTS } from "./constants.ts";
import { escapeAttribute } from "./escape.ts";

/**
 * Check if element is a void element
 */
export function isVoidElement(tag: string): boolean {
  return VOID_ELEMENTS.has(tag.toLowerCase());
}

/**
 * Check if element is self-closing
 */
export function isSelfClosing(tag: string): boolean {
  return SELF_CLOSING_ELEMENTS.has(tag.toLowerCase());
}

/**
 * Check if value is a template
 */
export function isTemplate(value: unknown): value is Template {
  return typeof value === "object" && value !== null && "isTemplate" in value;
}

/**
 * Process HTML attributes
 */
export function processHTMLAttributes(attrs: Record<string, unknown>): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(attrs)) {
    if (value === undefined || value === null) continue;
    if (value === true) {
      parts.push(key);
    } else {
      parts.push(`${key}="${escapeAttribute(String(value))}"`);
    }
  }

  return parts.join(" ");
}

/**
 * Clean up HTML output
 */
export function cleanHTML(html: string): string {
  return html.replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
}
