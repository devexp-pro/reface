import { createLogger } from "@reface/core";
import type { ElementChild } from "@reface/html";
import { Template } from "@reface/html";

const logger = createLogger("JSX:Children");

/**
 * Process JSX children
 */
export function processJSXChildren(children: ElementChild[]): ElementChild[] {
  logger.debug("Processing JSX children", {
    count: children.length,
  });

  try {
    const result: ElementChild[] = [];

    for (const child of children) {
      if (Array.isArray(child)) {
        logger.debug("Processing array child", {
          length: child.length,
        });
        result.push(...processJSXChildren(child));
      } else if (child && typeof child === "object") {
        if ("isTemplate" in child || "type" in child) {
          logger.debug("Processing template child", {
            tag: (child as Template).tag,
          });
          result.push(child);
        } else {
          logger.debug("Processing object child", {
            type: typeof child,
          });
          result.push(String(child));
        }
      } else if (child != null) {
        logger.debug("Processing primitive child", {
          type: typeof child,
        });
        result.push(String(child));
      }
    }

    logger.info("Processed JSX children", {
      inputCount: children.length,
      outputCount: result.length,
    });

    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to process JSX children", error, { children });
    } else {
      logger.error(
        "Unknown error processing JSX children",
        new Error(String(error)),
        { children },
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
        { child },
      );
    }
    throw error;
  }
}
