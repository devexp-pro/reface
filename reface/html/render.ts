import type {
  Template,
  TemplateFragment,
  ElementChild,
} from "../html/types.ts";
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

// Класс для сбора уникальных стилей
class StyleCollector {
  private styles = new Set<string>();

  add(css: string) {
    this.styles.add(css);
  }

  toString() {
    if (this.styles.size === 0) return "";
    return `<style>\n${Array.from(this.styles).join("\n")}\n</style>`;
  }
}

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
