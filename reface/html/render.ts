import type { Template, TemplateFragment, ElementChild } from "./types.ts";
import { isTemplateFragment } from "./types.ts";
import { renderAttributes } from "./attributes.ts";
import { StyleCollector } from "./StyleCollector.ts";
import { VOID_ELEMENTS } from "./constants.ts";

function renderChild(
  child: ElementChild,
  styleCollector: StyleCollector
): string {
  if (child == null || child === false || child === true) return "";

  // Обрабатываем массивы
  if (Array.isArray(child)) {
    return child.map((c) => renderChild(c, styleCollector)).join("");
  }

  if (typeof child === "object") {
    // Обрабатываем Template
    if ("isTemplate" in child) {
      return render(child, styleCollector);
    }
    // Обрабатываем TemplateFragment
    if (isTemplateFragment(child)) {
      return child.content;
    }
    // Обрабатываем фрагменты из JSX
    if ("type" in child && child.type === "fragment") {
      return child.content;
    }
  }

  return String(child);
}

export function render(
  input: Template | TemplateFragment | ElementChild[],
  styleCollector?: StyleCollector
): string {
  // Создаем коллектор стилей только для корневого вызова
  const isRoot = !styleCollector;
  styleCollector = styleCollector || new StyleCollector();

  // Обрабатываем массивы (для Fragment)
  if (Array.isArray(input)) {
    return input.map((child) => renderChild(child, styleCollector)).join("");
  }

  // Обрабатываем TemplateFragment
  if (isTemplateFragment(input)) {
    return input.content;
  }

  const { tag, attributes: attrs, children, css } = input;

  // Добавляем CSS в коллектор если он есть
  if (css) {
    styleCollector.add(css);
  }

  // Рендерим детей, разворачивая массивы
  const renderedChildren = children
    .flatMap((child) => (Array.isArray(child) ? child : [child]))
    .map((child) => renderChild(child, styleCollector))
    .join("");

  // Формируем HTML
  const isVoid = VOID_ELEMENTS.has(tag);
  const html = `<${tag}${renderAttributes(attrs)}${
    isVoid ? " />" : `>${renderedChildren}</${tag}>`
  }`;

  // Добавляем собранные стили только в корневом рендере
  if (isRoot) {
    return `${html}\n${styleCollector}`;
  }

  return html;
}
