import type {
  Template,
  ElementChild,
  TemplateLiteralFunction,
} from "../html/types.ts";
import { processAttributes } from "../html/attributes.ts";
import { escapeHTML } from "../html/escape.ts";
import { isTemplateFragment } from "../html/types.ts";
import { processJSXChildren } from "../html/templates.ts";

export function createElement(
  type: string | ((props: any) => Template | TemplateLiteralFunction),
  props: Record<string, unknown> | null,
  ...children: unknown[]
): Template {
  // Если type это функция (компонент), вызываем её
  if (typeof type === "function") {
    const result = type({ ...props, children: processJSXChildren(children) });

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
    attributes: processAttributes(props || {}),
    children: processJSXChildren(children),
    isTemplate: true,
    css: "",
    rootClass: "",
  };
}
