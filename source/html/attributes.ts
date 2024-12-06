// Функции для работы с атрибутами
import type { HTMLAttributes } from "../core/Template.ts";

/**
 * Convert object attributes to string
 */
export function attributes(props: HTMLAttributes): string {
  return Object.entries(props)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== false
    )
    .map(([key, value]) => {
      // Handle boolean attributes
      if (value === true) return key;
      // Handle arrays (e.g. class names)
      if (Array.isArray(value)) return `${key}="${value.join(" ")}"`;
      // Handle objects (e.g. style)
      if (typeof value === "object") {
        return `${key}='${JSON.stringify(value)}'`;
      }
      return `${key}="${value}"`;
    })
    .join(" ");
}
