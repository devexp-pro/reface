import { createLogger } from "@reface/core";
import type { ElementChild } from "@reface/html";
import { processAttributes, Template } from "@reface/html";
import type { ComponentFunction } from "../elements/types.ts";
import { processJSXChildren } from "./children.ts";

const logger = createLogger("JSX");

/**
 * Create element from JSX
 */
export function createElement(
  tag: string | ComponentFunction,
  props: Record<string, unknown> | null,
  ...children: ElementChild[]
): Template | ElementChild[] {
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
        const result = tag({
          ...props,
          children: children.length === 1 ? children[0] : children,
        });

        // Проверяем сначала на Template
        if (result instanceof Template) {
          // Если это фрагмент, возвращаем его children напрямую
          if (result.tag === "fragment") {
            return result.children;
          }
          return result;
        }

        // Если это массив (результат Fragment), возвращаем его
        if (Array.isArray(result)) {
          return result;
        }

        throw new Error("Component must return Template or ElementChild[]");
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
            { name: tag.name || "Anonymous", props, children },
          );
        }
        throw error;
      }
    }

    // Handle regular elements
    return new Template({
      tag,
      attributes: processAttributes(props || {}),
      children: processJSXChildren(children),
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
