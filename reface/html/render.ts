import { createLogger } from "@reface/core";
import type { ElementChild } from "./types.ts";
import { StyleCollector } from "./StyleCollector.ts";
import { renderAttributes } from "./attributes.ts";
import { VOID_ELEMENTS } from "./constants.ts";
import { ScriptCollector } from "./ScriptCollector.ts";
import { Template } from "./Template.ts";
import { TemplateHtml } from "./TemplateHtml.ts";
import { TemplateFragment } from "./TemplateFragment.ts";
import { TemplateText } from "./TemplateText.ts";
import { escapeHTML } from "./escape.ts";

const logger = createLogger("HTML:Render");

/**
 * Render child element
 */
function renderChild(child: ElementChild, styles: StyleCollector): string {
  logger.debug("Rendering child", { type: typeof child });

  try {
    if (child == null || child === false || child === true) {
      logger.debug("Skipping empty child");
      return "";
    }

    // Handle arrays
    if (Array.isArray(child)) {
      logger.debug("Processing array child", { length: child.length });
      return child.map((c) => renderChild(c, styles)).join("");
    }

    if (typeof child === "object" && child !== null) {
      // Handle TemplateText
      if (child instanceof TemplateText) {
        logger.debug("Processing text node", {
          length: child.getContent().length,
        });
        return escapeHTML(child.getContent());
      }

      // Handle TemplateFragment
      if (child instanceof TemplateFragment) {
        logger.debug("Processing fragment", {
          childrenCount: child.getChildren().length,
        });
        return child.getChildren()
          .map((c) => renderChild(c, styles))
          .join("");
      }

      // Handle Template
      if (child instanceof Template) {
        logger.debug("Processing template", { tag: child.tag });
        return renderTemplate(child, styles, new ScriptCollector());
      }

      // Handle TemplateHtml
      if (child instanceof TemplateHtml) {
        logger.debug("Processing HTML template", {
          childrenCount: child.children.length,
        });
        return child.children
          .map((c) => renderChild(c, styles))
          .join("");
      }
    }

    // Строки считаем безопасным HTML
    logger.debug("Processing string child", { value: String(child) });
    return String(child);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to render child", error, { child });
    } else {
      logger.error("Unknown error rendering child", new Error(String(error)), {
        child,
      });
    }
    throw error;
  }
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
  styles: StyleCollector,
  scripts: ScriptCollector,
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
    const children = template.children
      .map((child) => renderChild(child, styles))
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
