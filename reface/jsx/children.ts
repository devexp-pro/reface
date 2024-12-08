import { createLogger } from "@reface/core";
import type { Template, ElementChild } from "@reface/html";

const logger = createLogger("JSX:Children");

/**
 * Process JSX children
 */
export function processJSXChildren(children: unknown[]): ElementChild[] {
  logger.debug("Processing JSX children", { count: children.length });

  try {
    const processed = children.reduce<ElementChild[]>((acc, child) => {
      // Handle null/undefined/boolean
      if (child == null || typeof child === "boolean") {
        logger.debug("Skipping null/undefined/boolean child", { child });
        return acc;
      }

      // Handle arrays (flatten)
      if (Array.isArray(child)) {
        logger.debug("Processing array child", { length: child.length });
        acc.push(...processJSXChildren(child));
        return acc;
      }

      // Handle templates
      if (typeof child === "object" && "isTemplate" in child) {
        logger.debug("Processing template child", {
          tag: (child as Template).tag,
        });
        acc.push(child as Template);
        return acc;
      }

      // Handle primitives
      if (typeof child === "string" || typeof child === "number") {
        logger.debug("Processing primitive child", { type: typeof child });
        acc.push(String(child));
        return acc;
      }

      // Handle unknown types
      logger.warn("Converting unknown child type to string", {
        child,
        type: typeof child,
      });
      acc.push(String(child));
      return acc;
    }, []);

    logger.info("Processed JSX children", {
      inputCount: children.length,
      outputCount: processed.length,
    });

    return processed;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to process JSX children", error, { children });
    } else {
      logger.error(
        "Unknown error processing JSX children",
        new Error(String(error)),
        { children }
      );
    }
    throw error;
  }
}

/**
 * Process single JSX child
 */
export function processJSXChild(child: unknown): ElementChild {
  logger.debug("Processing single JSX child", { type: typeof child });

  try {
    // Handle null/undefined/boolean
    if (child == null || typeof child === "boolean") {
      logger.debug("Converting null/undefined/boolean to empty string");
      return "";
    }

    // Handle template
    if (typeof child === "object" && "isTemplate" in child) {
      logger.debug("Processing template", {
        tag: (child as Template).tag,
      });
      return child as Template;
    }

    // Handle primitives
    if (typeof child === "string" || typeof child === "number") {
      logger.debug("Converting primitive to string");
      return String(child);
    }

    // Handle unknown types
    logger.warn("Converting unknown type to string", {
      child,
      type: typeof child,
    });
    return String(child);
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to process JSX child", error, { child });
    } else {
      logger.error(
        "Unknown error processing JSX child",
        new Error(String(error)),
        { child }
      );
    }
    throw error;
  }
}
