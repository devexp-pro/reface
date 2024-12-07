import { escapeAttribute } from "./escape.ts";

/**
 * Convert object attributes to string
 */
export function attributes(props: Record<string, unknown>): string {
  return Object.entries(props)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== false
    )
    .map(([key, value]) => {
      // Handle boolean attributes
      if (value === true) return key;

      // Handle arrays (e.g. class names)
      if (Array.isArray(value)) {
        return `${key}="${escapeAttribute(value.join(" "))}"`;
      }

      // Handle objects (e.g. style)
      if (typeof value === "object") {
        return `${key}='${escapeAttribute(JSON.stringify(value))}'`;
      }

      // Handle regular values with escaping
      return `${key}="${escapeAttribute(String(value))}"`;
    })
    .join(" ");
}
