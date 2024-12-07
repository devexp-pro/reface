import type { Template, HTMLAttributes } from "../core/types.ts";
import { attributes } from "../html/attributes.ts";
import { escapeHTML } from "../html/escape.ts";
import { isTemplateFragment } from "../html/types.ts";

function processChildren(children: unknown[]): (string | Template)[] {
  return children.flatMap((child): (string | Template)[] => {
    if (child == null || child === false) return [];
    if (child === true) return [];

    // Обработка массивов
    if (Array.isArray(child)) {
      return processChildren(child);
    }

    // Обработка фрагментов
    if (isTemplateFragment(child)) {
      return [child.content];
    }

    // Обработка шаблонов
    if (typeof child === "object" && "isTemplate" in child) {
      return [child as Template];
    }

    // Преобразование примитивов в строки
    return [escapeHTML(String(child))];
  });
}

export function createElement(
  tag: string | ((props: any) => Template),
  props: HTMLAttributes | null,
  ...children: unknown[]
): Template {
  // Если tag это функция (компонент)
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }

  // Обработка children
  const processedChildren = processChildren(children);

  return {
    tag,
    attributes: props ? attributes(props) : "",
    children: processedChildren,
    css: "",
    isTemplate: true,
    rootClass: "",
  };
}
