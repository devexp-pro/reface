import type { Template } from "../types.ts";

export function render(template: Template): string {
  const styles = new Set<string>();
  const rendered = renderTemplate(template, styles);
  const css = Array.from(styles).join("\n");

  const cleanHtml = rendered.replace(/>\s+</g, ">\n  <").trim();

  return css ? `${cleanHtml}\n<style>\n${css}\n</style>` : cleanHtml;
}

function renderTemplate(template: Template, styles: Set<string>): string {
  if (template.css) {
    styles.add(template.css);
  }

  const children = template.children
    .map((child) => {
      if (child === null) return "";
      if (typeof child === "object" && "isTemplate" in child) {
        return renderTemplate(child as Template, styles);
      }
      return String(child);
    })
    .join("");

  return `<${template.tag}${
    template.attributes ? ` ${template.attributes}` : ""
  }>${children}</${template.tag}>`;
}
