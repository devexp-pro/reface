import type { ITemplate } from "../types.ts";
import { EMPTY_VALUES } from "../constants.ts";

export function isEmptyValue(value: unknown): boolean {
  return EMPTY_VALUES.includes(value);
}

export function isTemplate(value: unknown): value is ITemplate {
  return typeof value === "object" &&
    value !== null &&
    "toHtml" in value;
}
