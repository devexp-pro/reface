import type { Template } from "../types/mod.ts";

/**
 * Renders a template to HTML string
 */
export function render(input: Template | (Template | string)[]): string {
  const styles = new Set<string>();

  function renderTemplate(template: Template): string {
    // Handle Fragment (empty tag)
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

    // Collect CSS
    if (template.css) {
      styles.add(template.css);
    }

    // Process children
    const children = template.children
      .map((child) => {
        if (child === null || child === undefined) return "";
        if (typeof child === "object" && "isTemplate" in child) {
          return renderTemplate(child as Template);
        }
        return String(child);
      })
      .join("");

    // Build HTML
    const html = `<${template.tag}${
      template.attributes ? ` ${template.attributes}` : ""
    }>${children}</${template.tag}>`;

    return html;
  }

  // Handle array input
  const html = Array.isArray(input)
    ? input
        .map((item) => (typeof item === "string" ? item : renderTemplate(item)))
        .join("")
    : renderTemplate(input);

  // Add collected styles at the end
  const collectedStyles = Array.from(styles);
  if (collectedStyles.length > 0) {
    return `${html}\n<style>\n  ${collectedStyles
      .join("\n")
      .trim()
      .replace(/\n/g, "\n  ")}\n</style>`;
  }

  return html;
}
