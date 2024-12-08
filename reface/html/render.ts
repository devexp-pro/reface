import type { Template, TemplateFragment, ElementChild } from "./types.ts";
import { VOID_ELEMENTS } from "./constants.ts";
import { isTemplateFragment } from "./types.ts";
import { renderAttributes } from "./attributes.ts";
import { StyleCollector } from "./StyleCollector.ts";

/**
 * Render child element
 */
function renderChild(
  child: ElementChild,
  styleCollector: StyleCollector
): string {
  if (child == null || child === false || child === true) return "";

  // Handle arrays
  if (Array.isArray(child)) {
    return child.map((c) => renderChild(c, styleCollector)).join("");
  }

  if (typeof child === "object" && child !== null) {
    // Handle Template
    if ("isTemplate" in child) {
      return render(child as Template, styleCollector);
    }
    // Handle TemplateFragment
    if (isTemplateFragment(child)) {
      return child.content;
    }
    // Handle JSX fragments
    if ("type" in child && child.type === "fragment") {
      return (child as TemplateFragment).content;
    }
  }

  return String(child);
}

/**
 * Render template to HTML string
 */
export function render(
  input: Template | TemplateFragment | ElementChild[],
  styleCollector?: StyleCollector
): string {
  // Create style collector only for root call
  const isRoot = !styleCollector;
  styleCollector = styleCollector || new StyleCollector();

  // Handle arrays (for Fragment)
  if (Array.isArray(input)) {
    return input.map((child) => renderChild(child, styleCollector)).join("");
  }

  // Handle TemplateFragment
  if (isTemplateFragment(input)) {
    return input.content;
  }

  const { tag, attributes: attrs = {}, children = [], css } = input;

  // Add CSS to collector if present
  if (css) {
    styleCollector.add(css);
  }

  // Render children, flattening arrays
  const renderedChildren = children
    .flatMap((child) => (Array.isArray(child) ? child : [child]))
    .map((child) => renderChild(child, styleCollector))
    .join("");

  // Build HTML
  const isVoid = VOID_ELEMENTS.has(tag);
  const html = `<${tag}${renderAttributes(attrs)}${
    isVoid ? " />" : `>${renderedChildren}</${tag}>`
  }`;

  // Add collected styles only in root render
  if (isRoot) {
    return `${html}\n${styleCollector}`;
  }

  return html;
}
