import { escapeHTML } from "./escape.ts";

export function formatClassName(
  value: string | string[] | Record<string, boolean> | undefined,
): string {
  if (!value) return "";

  if (Array.isArray(value)) {
    return value.filter(Boolean).join(" ");
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([_, included]) => included)
      .map(([className]) => className)
      .join(" ");
  }

  return String(value);
}

export function formatStyle(
  value: string | Record<string, string | number> | undefined,
): string {
  if (!value) return "";

  if (typeof value === "object") {
    return Object.entries(value)
      .map(([key, val]) => {
        const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
        return `${cssKey}: ${val}`;
      })
      .join("; ");
  }

  return value;
}

export function formatAttributes(
  attrs: Record<string, unknown>,
): string {
  const formatted = Object.entries(attrs)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(([key, value]) => {
      if (value === true) return key;
      if (value === false) return "";

      let formatted = value;
      if (key === "class" || key === "className") {
        formatted = formatClassName(value as any);
      } else if (key === "style") {
        formatted = formatStyle(value as any);
      }

      return formatted ? `${key}="${escapeHTML(String(formatted))}"` : "";
    })
    .filter(Boolean);

  return formatted.length ? ` ${formatted.join(" ")}` : "";
}
