// Функции для работы с атрибутами
import type { Attributes, ClassInput } from "./types.ts";

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
      }
      if (value === true) return key;
      if (value === false) return "";
      return `${key}="${value}"`;
    })
    .filter(Boolean)
    .join(" ");
}
