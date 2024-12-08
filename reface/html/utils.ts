import { VOID_ELEMENTS, SELF_CLOSING_ELEMENTS } from "./constants.ts";

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
 * Check if value is a template fragment
 */
export function isTemplate(value: unknown): value is Template {
  return typeof value === "object" && value !== null && "isTemplate" in value;
}
