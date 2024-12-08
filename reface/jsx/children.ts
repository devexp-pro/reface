import type { ElementChild } from "../html/types.ts";
import { isTemplateFragment } from "../html/types.ts";
import { escapeHTML } from "../html/escape.ts";

/**
 * Process JSX children
 */
export function processJSXChildren(children: unknown[]): ElementChild[] {
  return children.flatMap((child): ElementChild[] => {
    // Пропускаем null, undefined, false
    if (child == null || child === false) return [];
    // Пропускаем true
    if (child === true) return [];

    // Обработка массивов (рекурсивно)
    if (Array.isArray(child)) {
      return processJSXChildren(child);
    }

    // Обработка фрагментов
    if (isTemplateFragment(child)) {
      return [child];
    }

    // Обработка шаблонов
    if (typeof child === "object" && "isTemplate" in child) {
      return [child as Template];
    }

    // Обработка функций (компонентов)
    if (typeof child === "function" && "isTemplate" in child) {
      return [child`` as Template];
    }

    // Обработка примитивов
    if (
      typeof child === "string" ||
      typeof child === "number" ||
      typeof child === "bigint"
    ) {
      return [escapeHTML(String(child))];
    }

    // Возвращаем пустой массив для неизвестных типов
    return [];
  });
}
