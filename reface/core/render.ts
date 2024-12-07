import type { Template } from "./Template.ts";
import type { TemplateFragment } from "../html/types.ts";
import { isTemplateFragment } from "../html/types.ts";
import { RenderError, withErrorTracking, ErrorContext } from "./errors.ts";
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

function getFunctionSource(fn: Function): string {
  const source = fn.toString();
  // Если функция слишком длинная, показываем только начало
  if (source.length > 500) {
    return source.slice(0, 500) + "...";
  }
  return source;
}

function validateTemplate(
  template: Template | TemplateFragment | undefined,
  componentName?: string
): void {
  if (template === undefined) {
    ErrorContext.setLastError({
      component: componentName || "Unknown",
      template: undefined,
    });
    throw new RenderError(
      "Template is undefined (this usually means a component returned undefined)",
      template,
      ErrorContext.getContext()
    );
  }

  if (typeof template === "function") {
    ErrorContext.setLastError({
      component: componentName || "Unknown",
      template: {
        type: "function",
        name: template.name || "(anonymous)",
        source: getFunctionSource(template),
      },
    });
    throw new RenderError(
      "Got function instead of template (this usually means a component factory was not called)",
      undefined,
      ErrorContext.getContext()
    );
  }

  if (!("tag" in template)) {
    ErrorContext.setLastError({
      component: componentName || "Unknown",
      template,
    });
    throw new RenderError(
      "Invalid template structure - missing 'tag' property",
      template,
      ErrorContext.getContext()
    );
  }
}

export function render(
  input: Template | TemplateFragment | (Template | string)[] | undefined
): string {
  // Сбрасываем контекст ошибок перед рендером
  ErrorContext.reset();

  if (input === undefined) {
    throw new RenderError(
      "Cannot render undefined",
      undefined,
      ErrorContext.getContext()
    );
  }

  const styles = new Set<string>();

  function renderTemplate(template: Template | TemplateFragment): string {
    return withErrorTracking(
      isTemplateFragment(template) ? "Fragment" : template.tag || "Unknown",
      () => {
        validateTemplate(template);

        if (isTemplateFragment(template)) {
          return template.content;
        }

        if (template.tag === "") {
          return template.children
            .map((child) => {
              if (child === null || child === undefined) return "";
              if (typeof child === "object" && "isTemplate" in child) {
                return renderTemplate(child as Template);
              }
              return String(child);
            })
            .join("");
        }

        if (template.css) {
          styles.add(template.css);
        }

        const children = template.children
          .map((child) => {
            if (child === null || child === undefined) return "";
            if (typeof child === "object" && "isTemplate" in child) {
              return renderTemplate(child as Template);
            }
            return String(child);
          })
          .join("");

        const isVoid = VOID_ELEMENTS.has(template.tag);
        return `<${template.tag}${
          template.attributes ? ` ${template.attributes}` : ""
        }${isVoid ? " />" : `>${children}</${template.tag}>`}`;
      }
    );
  }

  const html = Array.isArray(input)
    ? input
        .map((item) => (typeof item === "string" ? item : renderTemplate(item)))
        .join("")
    : renderTemplate(input);

  const collectedStyles = Array.from(styles);
  if (collectedStyles.length > 0) {
    return `${html}\n<style>\n  ${collectedStyles
      .join("\n")
      .trim()
      .replace(/\n/g, "\n  ")}\n</style>`;
  }

  return html;
}

// Экспортируем для использования в JSX
export function setJSXStack(stack?: string[]) {
  ErrorContext.setJSXStack(stack);
}
