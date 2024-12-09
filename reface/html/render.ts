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
          length: child.content.length,
        });
        return child.toString(); // Уже включает escapeHTML
      }

      // Handle TemplateFragment
      if (child instanceof TemplateFragment) {
        logger.debug("Processing fragment", {
          childrenCount: child.children.length,
        });
        return child.children
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
          content: child.children[0].length,
        });
        return child.children[0] as string;
      }

      // Handle fragments
      if ("content" in child) {
        logger.debug("Processing fragment child", {
          contentLength: child.content.length,
        });
        return child.content;
      }
    }

    // Handle primitives by converting to TemplateText
    logger.debug("Processing primitive child", { value: String(child) });
    return TemplateText.from(child).toString();
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
      logger.debug("Adding CSS to collector", { css: template.css });
      styles.add(template.css);
    }

    // Add scripts if present
    if (template.script) {
      logger.debug("Adding script to collector", { script: template.script });
      scripts.addScript(template.script);
    }

    if (template.scriptFile) {
      logger.debug("Adding script file to collector", {
        src: template.scriptFile,
      });
      scripts.addScriptFile(template.scriptFile);
    }

    // Process attributes
    const attrs = renderAttributes(template.attributes);

    // Handle void elements
    if (VOID_ELEMENTS.has(template.tag)) {
      logger.debug("Rendering void element", { tag: template.tag });
      return `<${template.tag}${attrs}/>`;
    }

    // Render children
    let children = "";
    if (template.children?.length) {
      logger.debug("Rendering children", { count: template.children.length });
      children = template.children
        .map((child) => renderChild(child, styles))
        .join("");
    }

    const result = `<${template.tag}${attrs}>${children}</${template.tag}>`;

    logger.info("Template rendered", {
      tag: template.tag,
      attributesLength: attrs.length,
      childrenLength: children.length,
      resultLength: result.length,
    });

    return result;
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
      // Для TemplateHtml просто берем первый child как HTML
      result = template.children[0] as string;
    } else if (template instanceof TemplateFragment) {
      // Для TemplateFragment рендерим все children
      result = template.children
        .map((child) => renderChild(child, styles))
        .join("");
    } else {
      // Для обычных Template рендерим полностью
      result = renderTemplate(template, styles, scripts);
    }

    // Add collected styles
    const styleTag = styles.toString();
    if (styleTag) {
      logger.debug("Adding style tag", { styleTag });
      result += styleTag;
    }

    // Add collected scripts
    const scriptTags = scripts.toString();
    if (scriptTags) {
      logger.debug("Adding script tags", { scriptTags });
      result += scriptTags;
    }

    logger.info("Render complete", {
      templateType: template.constructor.name,
      hasStyles: Boolean(styleTag),
      hasScripts: Boolean(scriptTags),
      childrenCount: template.children?.length,
    });

    return result;
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

// Генерируем уникальные ID
let idCounter = 0;
function generateId(): string {
  return `reface-${idCounter++}`;
}
