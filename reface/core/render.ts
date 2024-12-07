import type { Template } from "./types.ts";
import type { TemplateFragment } from "../html/types.ts";
import { isTemplateFragment } from "../html/types.ts";
import { RenderError, withErrorTracking, ErrorContext } from "./errors.ts";

// Тип для входных данных render
type RenderInput =
  | Template
  | TemplateFragment
  | ((props: any) => Template) // Добавляем поддержку функций
  | (Template | string)[]
  | undefined;

// Тип для функции, возвращающей Template
type TemplateFunction = () => Template;

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

// Type guard для функции, возвращающей Template
function isTemplateFunction(value: unknown): value is TemplateFunction {
  return typeof value === "function";
}

function validateTemplate(template: unknown): asserts template is Template {
  if (template == null) {
    throw new RenderError("Got null or undefined instead of template", {
      template,
      message: "Template is null or undefined",
    });
  }

  if (isTemplateFunction(template)) {
    const result = template();
    if (!result || typeof result !== "object" || !("isTemplate" in result)) {
      throw new RenderError("Function did not return a valid template", {
        function: template.toString(),
        result,
        message: "Function returned invalid template",
      });
    }
    return;
  }

  if (typeof template !== "object") {
    throw new RenderError(`Got ${typeof template} instead of template`, {
      template,
      message: `Expected object, got ${typeof template}`,
    });
  }

  if (!("isTemplate" in template)) {
    throw new RenderError("Got object without isTemplate property", {
      template,
      message: "Missing isTemplate property",
    });
  }
}

export function render(input: RenderInput): string {
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

  function renderTemplate(
    template: Template | TemplateFragment | ((props: any) => Template)
  ): string {
    return withErrorTracking(
      isTemplateFragment(template)
        ? "Fragment"
        : typeof template === "function"
        ? "Component"
        : template.tag || "Unknown",
      () => {
        // Если получили функцию, вызываем её
        if (typeof template === "function") {
          return renderTemplate(template({}));
        }

        validateTemplate(template);

        if (isTemplateFragment(template)) {
          return template.content;
        }

        if (template.tag === "") {
          return template.children.map(processChild).join("");
        }

        if (template.css) {
          styles.add(template.css);
        }

        const children = template.children.map(processChild).join("");

        const isVoid = VOID_ELEMENTS.has(template.tag);
        return `<${template.tag}${
          template.attributes ? ` ${template.attributes}` : ""
        }${isVoid ? " />" : `>${children}</${template.tag}>`}`;
      }
    );
  }

  function processChild(child: Template["children"][number]): string {
    if (child == null) return "";

    if (typeof child === "object") {
      if ("isTemplate" in child) {
        return renderTemplate(child);
      }
      if (isTemplateFragment(child)) {
        return child.content;
      }
    }

    return String(child);
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
