import type { ElementChildType, Template } from "./types.ts";
import { REFACE_TEMPLATE } from "./types.ts";

function isTemplate(value: unknown): value is Template {
  return typeof value === "function" && value[REFACE_TEMPLATE] === true;
}

function isEmptyValue(value: unknown): boolean {
  return value === null || value === undefined || value === false ||
    value === "";
}

export function processChildren(
  strings: TemplateStringsArray,
  values: unknown[],
): ElementChildType[] {
  const children: ElementChildType[] = [];

  for (let i = 0; i < strings.length; i++) {
    const trimmed = strings[i].trim();
    if (trimmed) {
      children.push(trimmed);
    }

    if (i < values.length) {
      const value = values[i];

      if (Array.isArray(value)) {
        children.push(...value);
      } else if (isTemplate(value)) {
        children.push(value);
      } else if (!isEmptyValue(value)) {
        children.push(String(value));
      }
    }
  }

  return children;
}
