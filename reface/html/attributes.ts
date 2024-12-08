import { escapeAttribute } from "./escape.ts";
import type { HTMLAttributes, TemplateAttributes } from "../core/types.ts";

/**
 * Convert props to TemplateAttributes
 */
export function processAttributes(
  props: Record<string, unknown>
): TemplateAttributes {
  const result: TemplateAttributes = {};

  for (const [key, value] of Object.entries(props)) {
    // Пропускаем undefined/null/false
    if (value === undefined || value === null || value === false) continue;

    if (key === "class") {
      // Преобразуем class в массив
      result.class = Array.isArray(value)
        ? value
        : String(value).split(/\s+/).filter(Boolean);
    } else if (key === "style" && typeof value === "object") {
      // Обработка style как объекта
      result.style = value as Record<string, string>;
    } else if (value === true) {
      // Boolean атрибуты
      result[key] = key;
    } else {
      // Обычные значения
      result[key] = String(value);
    }
  }

  return result;
}

/**
 * Convert attributes to string for HTML
 */
export function renderAttributes(attrs: TemplateAttributes): string {
  const parts: string[] = [];

  for (const [key, value] of Object.entries(attrs)) {
    if (value == null) continue;

    if (key === "class" && Array.isArray(value)) {
      if (value.length > 0) {
        parts.push(`class="${escapeAttribute(value.join(" "))}"`);
      }
    } else if (key === "style") {
      if (typeof value === "string") {
        parts.push(`style="${escapeAttribute(value)}"`);
      } else if (typeof value === "object") {
        const style = Object.entries(value)
          .map(([k, v]) => `${k}:${v}`)
          .join(";");
        parts.push(`style="${escapeAttribute(style)}"`);
      }
    } else if (typeof value === "boolean") {
      if (value) parts.push(key);
    } else {
      parts.push(`${key}="${escapeAttribute(String(value))}"`);
    }
  }

  return parts.length ? " " + parts.join(" ") : "";
}
