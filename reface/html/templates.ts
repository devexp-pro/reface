import { escapeHTML } from "./escape.ts";
import type { Template, TemplateFragment, ElementChild } from "./types.ts";
import { isTemplateFragment } from "./types.ts";
import { processAttributes } from "./attributes.ts";

/**
 * Creates a trusted HTML fragment
 */
export function html(
  strings: TemplateStringsArray | string,
  ...values: unknown[]
): TemplateFragment {
  // If used as a function for trusted HTML
  if (typeof strings === "string") {
    return {
      type: "fragment",
      content: strings,
    };
  }

  // Process interpolated values
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    // Don't escape TemplateFragments
    if (isTemplateFragment(value)) {
      result += value.content;
    } else if (typeof value === "object" && "isTemplate" in value) {
      // Render nested templates
      result += renderTemplate(value as Template);
    } else {
      // Escape everything else
      result += escapeHTML(String(value));
    }
    result += strings[i + 1];
  }

  return {
    type: "fragment",
    content: result,
  };
}

/**
 * Creates a template from HTML string
 */
export function template(
  tag: string,
  attributes: Record<string, unknown> = {},
  content: string | ElementChild[] = ""
): Template {
  return {
    tag,
    attributes: processAttributes(attributes),
    children: Array.isArray(content) ? content : [content],
    isTemplate: true,
    css: "",
    rootClass: "",
  };
}

/**
 * Renders a template to string without global context
 */
function renderTemplate(input: Template): string {
  const { tag, attributes: attrs, children } = input;

  // Render children
  const renderedChildren = children
    .map((child) => {
      if (child == null || child === false) return "";
      if (child === true) return "";

      if (typeof child === "object") {
        if ("isTemplate" in child) {
          return renderTemplate(child as Template);
        }
        if (isTemplateFragment(child)) {
          return child.content;
        }
      }

      return escapeHTML(String(child));
    })
    .join("");

  // Generate HTML
  return `<${tag}${attrs ? " " + attrs : ""}>${renderedChildren}</${tag}>`;
}

/**
 * Process template literal children
 */
export function processTemplateChildren(
  strings: TemplateStringsArray,
  values: ElementChild[]
): ElementChild[] {
  return strings.reduce((acc: ElementChild[], str, i) => {
    if (str) acc.push(str);
    if (i < values.length) acc.push(values[i]);
    return acc;
  }, []);
}

/**
 * Process JSX children
 */
export function processJSXChildren(children: unknown[]): ElementChild[] {
  return children.flatMap((child): ElementChild[] => {
    if (child == null || child === false) return [];
    if (child === true) return [];
    // ...
  });
}
