import { createLogger } from "@reface/core";
import type { ElementChildType } from "@reface/html";
import { processAttributes, Template } from "@reface/html";
import type { ComponentFunction } from "../elements/types.ts";
import { processJSXChildren } from "./children.ts";
import { TemplateFragment } from "@reface/html";

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

      try {
        const result = tag({
          ...props,
          children: children.length === 1 ? children[0] : children,
        });

        // Если это фрагмент, возвращаем его
        if (result instanceof TemplateFragment) {
          return result;
        }

        // Если это Template с тегом fragment, преобразуем в TemplateFragment
        if (result instanceof Template && result.tag === "fragment") {
          return new TemplateFragment(result.children);
        }

        // Если это массив, оборачиваем в TemplateFragment
        if (Array.isArray(result)) {
          return new TemplateFragment(result);
        }

        // Если это Template, возвращаем как есть
        if (result instanceof Template) {
          return result;
        }

        throw new Error(
          "Component must return Template, TemplateFragment or ElementChild[]",
        );
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
