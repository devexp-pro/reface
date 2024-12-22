import type { ElementChildType } from "./types.ts";
import { isEmptyValue, isTemplate } from "./utils.ts";

export function processChildren(
  strings: TemplateStringsArray,
  values: unknown[],
): ElementChildType[] {
  const children: ElementChildType[] = [];

  for (let i = 0; i < strings.length; i++) {
    if (strings[i]) {
      children.push(strings[i]);
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
