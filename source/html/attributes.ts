// Функции для работы с атрибутами
import type {
  HTMLAttributes,
  ClassInput,
  StyleInput,
  ClassValue,
} from "../types/base.ts";

/**
 * Converts class values to string
 */
export function classNames(...args: ClassInput[]): string {
  const classes: string[] = [];

  args.forEach((arg) => {
    if (!arg) return;

    if (typeof arg === "string") {
      classes.push(...arg.split(" ").filter(Boolean));
    } else if (typeof arg === "object") {
      Object.entries(arg).forEach(([key, value]) => {
        if (value) classes.push(key);
      });
    }
  });

  return classes.join(" ");
}

/**
 * Converts attributes object to string
 */
export function attributes(attrs: HTMLAttributes): string {
  if (!attrs) return "";

  const result: Record<string, unknown> = { ...attrs };

  // Handle className -> class conversion
  if ("className" in result) {
    const className = result.className as ClassValue;
    if (className) {
      result.class = classNames(className);
    }
    delete result.className;
  }

  // Handle class attribute
  if (result.class) {
    result.class = classNames(result.class as ClassValue);
  }

  // Convert to HTML attributes
  return Object.entries(result)
    .map(([key, value]) => {
      // Skip internal props
      if (key === "children" || key === "innerHTML") return "";

      // Handle boolean attributes
      if (value === true) return key;
      if (value === false || value === null || value === undefined) return "";

      // Handle objects (e.g. style)
      if (typeof value === "object") {
        if (key === "style" && value) {
          value = Object.entries(value as StyleInput)
            .map(([k, v]) => `${k}:${v}`)
            .join(";");
        } else {
          value = JSON.stringify(value);
        }
      }

      return `${key}="${value}"`;
    })
    .filter(Boolean)
    .join(" ");
}
