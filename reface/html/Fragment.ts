import { createLogger } from "@reface/core";
import type { Template, TemplateFragment } from "./types.ts";

const logger = createLogger("HTML:Fragment");

/**
 * Create template fragment
 */
export function createFragment(content: string): TemplateFragment {
  logger.debug("Creating fragment", { contentLength: content.length });
  return { content, isFragment: true };
}

/**
 * Process fragment children
 */
export function processFragmentChildren(children: Template[]): string {
  logger.debug("Processing fragment children", { count: children.length });

  try {
    const processed = children
      .map((child, index) => {
        logger.debug(`Processing child ${index}`, {
          tag: child.tag,
          hasChildren: Boolean(child.children?.length),
        });
        return child;
      })
      .join("");

    logger.info("Processed fragment children", {
      inputCount: children.length,
      outputLength: processed.length,
    });

    return processed;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to process fragment children", error, { children });
    } else {
      logger.error(
        "Unknown error processing fragment children",
        new Error(String(error)),
        { children }
      );
    }
    throw error;
  }
}
