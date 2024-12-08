import { createLogger } from "@reface/core";
import type { Template, ElementChild } from "@reface/html";
import { processAttributes } from "@reface/html";

const logger = createLogger("JSX");

/**
 * Create element from JSX
 */
export function createElement(
  tag: string | Function,
  props: Record<string, unknown> | null,
  ...children: unknown[]
): Template {
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

      try {
        return tag({
          ...props,
          children: children.length === 1 ? children[0] : children,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          logger.error("Function component failed", error, {
            name: tag.name || "Anonymous",
            props,
            children,
          });
        } else {
          logger.error(
            "Unknown error in function component",
            new Error(String(error)),
            { name: tag.name || "Anonymous", props, children }
          );
        }
        throw error;
      }
    }

    // Handle regular elements
    const processedProps = processAttributes(props || {});

    // Process children to ensure they match ElementChild type
    const processedChildren = children.map((child): ElementChild => {
      if (child == null) return "";
      if (
        typeof child === "string" ||
        typeof child === "number" ||
        typeof child === "boolean"
      ) {
        return String(child);
      }
      if (typeof child === "object" && "isTemplate" in child) {
        return child as Template;
      }
      logger.warn("Invalid child type, converting to string", { child });
      return String(child);
    });

    const template: Template = {
      tag,
      attributes: processedProps,
      children: processedChildren,
      isTemplate: true as const,
      css: "",
      rootClass: "",
    };

    logger.info("Created element", {
      tag,
      attributesCount: Object.keys(processedProps).length,
      childrenCount: processedChildren.length,
    });

    return template;
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
