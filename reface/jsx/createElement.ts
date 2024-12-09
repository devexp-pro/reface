import { createLogger } from "@reface/core";
import type { ElementChildType } from "@reface/html";
import { processAttributes, Template } from "@reface/html";
import type { ComponentFunction } from "../elements/types.ts";
import { TemplateFragment } from "@reface/html";
import { TemplateText } from "@reface/html";

const logger = createLogger("JSX");

/**
 * Create element from JSX
 */
export function createElement(
  tag: string | ComponentFunction,
  props: Record<string, unknown> | null,
  ...children: ElementChildType[]
): Template | TemplateFragment {
  try {
    logger.debug("Creating element", {
      tag,
      props,
      childrenCount: children.length,
    });

    // Handle function components
    if (typeof tag === "function") {
      logger.debug("Creating function component", {
        name: tag.name || "Anonymous",
        props,
      });

      // Вызываем компонент с props и children как отдельными аргументами
      return tag(props || {}, children);
    }

    // Handle regular elements
    return new Template({
      tag,
      attributes: processAttributes(props || {}),
      children: children,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to create element", error, { tag, props, children });
    } else {
      logger.error("Unknown error creating element", new Error(String(error)), {
        tag,
        props,
        children,
      });
    }
    throw error;
  }
}
