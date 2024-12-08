import type {
  Template,
  ElementChild,
  TemplateLiteralFunction,
} from "../core/types.ts";
import { attributes } from "../html/attributes.ts";
import { escapeHTML } from "../html/escape.ts";
import { isTemplateFragment } from "../html/types.ts";

function processChildren(children: unknown[]): ElementChild[] {
  return children.flatMap((child): ElementChild[] => {
    if (child == null || child === false) return [];
    if (child === true) return [];

    // Обработка массивов
    if (Array.isArray(child)) {
      return processChildren(child);
    }

    // Обработка фрагментов
    if (isTemplateFragment(child)) {
      return [child];
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
  type: string | ((props: any) => Template | TemplateLiteralFunction),
  props: Record<string, unknown> | null,
  ...children: unknown[]
): Template {
  // Если type это функция (компонент), вызываем её
  if (typeof type === "function") {
    const result = type({ ...props }, processChildren(children));

    // Проверяем что результат это Template или TemplateLiteralFunction
    if (!result || !("isTemplate" in result)) {
      throw new Error(
        "Component must return a Template or TemplateLiteralFunction"
      );
    }

    // Если это TemplateLiteralFunction, вызываем её без аргументов
    if (typeof result === "function") {
      return result`` as Template;
    }

    return result as Template;
  }

  // Создаем элемент
  return {
    tag: type,
    attributes: props ? attributes(props) : "",
    children: processChildren(children),
    isTemplate: true,
    css: "",
    rootClass: "",
  };
}
