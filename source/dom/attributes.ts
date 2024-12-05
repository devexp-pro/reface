// Функции для работы с атрибутами
import type { Attributes, ClassInput } from "./types.ts";
import { styles, type StyleInput } from "./styles.ts";

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

  return classes.filter(Boolean).join(" ");
}

export function attrs(attributes: Attributes): string {
  return Object.entries(attributes)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => {
      if (key === "class") {
        value = classNames(value as ClassInput);
      } else if (key === "style" && typeof value === "object") {
        value = styles(value as StyleInput);
      }
      if (value === true) return key;
      if (value === false) return "";
      return `${key}="${value}"`;
    })
    .filter(Boolean)
    .join(" ");
}
