import { TemplateHtml } from "./TemplateHtml.ts";

/**
 * Creates a trusted HTML template
 */
export function html(
  strings: TemplateStringsArray | string,
  ...values: unknown[]
): TemplateHtml {
  // If used as a function for trusted HTML
  if (typeof strings === "string") {
    return new TemplateHtml(strings);
  }

  // Process template literal
  return TemplateHtml.fromTemplateLiteral(strings, values);
}
