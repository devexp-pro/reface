import { createLogger } from "@reface/core";
import type { Template, ElementChild } from "./types.ts";
import { StyleCollector } from "./StyleCollector.ts";
import { renderAttributes } from "./attributes.ts";
import { VOID_ELEMENTS } from "./constants.ts";

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
      // Handle Template
      if ("isTemplate" in child) {
        logger.debug("Processing template child", { tag: child.tag });
        return renderTemplate(child as Template, styles);
      }
      // Handle fragments
      if ("content" in child) {
        logger.debug("Processing fragment child", {
          contentLength: child.content.length,
        });
        return child.content;
      }
    }

    // Handle primitives
    logger.debug("Processing primitive child", { value: String(child) });
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
export function render(template: Template): string {
  logger.debug("Starting render", { template });

  try {
    const styles = new StyleCollector();
    let result = renderTemplate(template, styles);

    // Add collected styles
    const styleTag = styles.toString();
    if (styleTag) {
      logger.debug("Adding style tag", { styleTag });
      result += styleTag;
    }

    logger.info("Render complete", {
      templateTag: template.tag,
      hasStyles: Boolean(styleTag),
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

/**
 * Render single template
 */
function renderTemplate(template: Template, styles: StyleCollector): string {
  logger.debug("Rendering template", { tag: template.tag });

  try {
    // Add CSS if present
    if (template.css) {
      logger.debug("Adding CSS to collector", { css: template.css });
      styles.add(template.css);
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
        { template }
      );
    }
    throw error;
  }
}
