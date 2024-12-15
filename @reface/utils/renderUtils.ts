import type { IRefaceTemplate } from "../types.ts";
import { EMPTY_VALUES } from "../constants.ts";

export function isEmptyValue(value: unknown): boolean {
  return EMPTY_VALUES.includes(value);
}

export function isTemplate(value: unknown): value is IRefaceTemplate {
  return typeof value === "object" &&
    value !== null &&
    "toHtml" in value;
}

export const toKebabCase = (str: string) =>
  str.replace(/([A-Z])/g, "-$1").toLowerCase();
