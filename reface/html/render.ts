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

  if (typeof child === "object") {
    if ("isTemplate" in child) {
      return render(child, styleCollector);
    }
    if (isTemplateFragment(child)) {
      return child.content;
    }
    if (Array.isArray(child)) {
      return child.map((c) => renderChild(c, styleCollector)).join("");
    }
  }

  return String(child);
}

export function render(
  input: Template | TemplateFragment,
  styleCollector?: StyleCollector
): string {
  // Создаем коллектор стилей только для корневого вызова
  const isRoot = !styleCollector;
  styleCollector = styleCollector || new StyleCollector();

  if (isTemplateFragment(input)) {
    return input.content;
  }

  const { tag, attributes: attrs, children, css } = input;

  // Добавляем CSS в коллектор если он есть
  if (css) {
    styleCollector.add(css);
  }

  // Рендерим детей
  const renderedChildren = children
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
