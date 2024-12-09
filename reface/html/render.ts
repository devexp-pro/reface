import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";
import { Template } from "./Template.ts";
import { TemplateText } from "./TemplateText.ts";
import { TemplateHtml } from "./TemplateHtml.ts";
import { TemplateFragment } from "./TemplateFragment.ts";
import { escapeHTML } from "./escape.ts";
import { StyleCollector } from "./StyleCollector.ts";
import { ScriptCollector } from "./ScriptCollector.ts";
import { renderAttributes } from "./attributes.ts";
import { VOID_ELEMENTS } from "./constants.ts";

const logger = createLogger("HTML:Render");

function renderChild(child: ElementChildType, styles: Set<string>): string {
  logger.debug("Rendering child", { type: typeof child });

  if (child instanceof Template) {
    return renderTemplate(child, styles);
  }

  if (child instanceof TemplateHtml) {
    logger.debug("Processing HTML template", {
      childrenCount: child.children.length,
    });
    // TemplateHtml всегда доверенный
    return child.children.map((c) => renderChild(c, styles)).join("");
  }

  if (child instanceof TemplateText) {
    logger.debug("Processing text node", { length: child.content.length });
    return child.trusted ? child.content : escapeHTML(child.content);
  }

  if (child == null) {
    logger.debug("Skipping empty child");
    return "";
  }

  return escapeHTML(String(child));
}

/**
 * Render template to HTML string
 */
export function render(
  template: Template | TemplateHtml | TemplateFragment,
): string {
  logger.debug("Starting render", { template });

  try {
    const styles = new StyleCollector();
    const scripts = new ScriptCollector();

    let result = "";
    if (template instanceof TemplateHtml) {
      // Рендерим все children
      result = template.children
        .map((child) => renderChild(child, styles))
        .join("");
    } else if (template instanceof TemplateFragment) {
      result = template.getChildren()
        .map((child) => renderChild(child, styles))
        .join("");
    } else {
      result = renderTemplate(template, styles, scripts);
    }

    // Add collected styles and scripts
    const styleTag = styles.toString();
    const scriptTags = scripts.toString();

    return `${result}${styleTag}${scriptTags}`;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to render", error, { template });
    } else {
      logger.error("Unknown error rendering", new Error(String(error)), {
        template,
      });
    }
    throw error;
  }
}

/**
 * Render single template
 */
function renderTemplate(
  template: Template,
  styles?: StyleCollector,
  scripts?: ScriptCollector,
): string {
  logger.debug("Rendering template", { tag: template.tag });

  try {
    // Add CSS if present
    if (template.css) {
      styles.add(template.css);
    }

    // Add scripts if present
    if (template.script) {
      scripts.addScript(template.script);
    }

    if (template.scriptFile) {
      scripts.addScriptFile(template.scriptFile);
    }

    // Process attributes
    const attrs = renderAttributes(template.attributes);

    // Handle void elements
    if (VOID_ELEMENTS.has(template.tag)) {
      return `<${template.tag}${attrs}/>`;
    }

    // Render children
    const children = (Array.isArray(template.children)
      ? template.children
      : [template.children])
      .map((child) =>
        renderChild(child, styles)
      )
      .join("");

    return `<${template.tag}${attrs}>${children}</${template.tag}>`;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to render template", error, { template });
    } else {
      logger.error(
        "Unknown error rendering template",
        new Error(String(error)),
        { template },
      );
    }
    throw error;
  }
}

// Генерируем уникальные ID
let idCounter = 0;
function generateId(): string {
  return `reface-${idCounter++}`;
}
