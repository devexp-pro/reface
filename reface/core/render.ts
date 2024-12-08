import type { Template, TemplateFragment } from "./types.ts";
import { isTemplateFragment } from "../html/types.ts";
import { renderAttributes } from "../html/attributes.ts";

// Список void элементов
const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

export function render(input: Template | TemplateFragment): string {
  if (isTemplateFragment(input)) {
    return input.content;
  }

  const { tag, attributes: attrs, children, css } = input;

  // Рендерим детей
  const renderedChildren = children
    .map((child) => {
      if (child == null || child === false) return "";
      if (child === true) return "";

      if (typeof child === "object") {
        if ("isTemplate" in child) {
          return render(child);
        }
        if (isTemplateFragment(child)) {
          return child.content;
        }
      }

      return String(child);
    })
    .join("");

  // Формируем HTML
  const isVoid = VOID_ELEMENTS.has(tag);
  const html = `<${tag}${renderAttributes(attrs)}${
    isVoid ? " />" : `>${renderedChildren}</${tag}>`
  }`;

  // Добавляем CSS если есть
  if (css) {
    return `${html}\n<style>\n${css}\n</style>`;
  }

  return html;
}
