import { createLogger } from "@reface/core";
import { Template } from "@reface/html";
import type {
  ComponentFunction,
  ElementChild,
  HTMLAttributes,
  TemplateLiteralFunction,
} from "./types.ts";
import { html, processAttributes } from "@reface/html";

const logger = createLogger("Component");

/**
 * Process template literal children
 */
export function processElementChildren(
  strings: TemplateStringsArray | undefined,
  values: ElementChild[],
): ElementChild[] {
  logger.debug("Processing element children", {
    hasStrings: Boolean(strings),
    valuesCount: values.length,
  });

  try {
    if (!strings) {
      logger.debug("No strings provided, returning values directly");
      return values;
    }

    logger.debug("Creating HTML fragment from template literal", {
      stringsCount: strings.length,
      valuesCount: values.length,
    });

    const fragment = html(strings, ...values);
    return [fragment as unknown as ElementChild];
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to process element children", error, {
        strings,
        values,
      });
    } else {
      logger.error(
        "Unknown error processing element children",
        new Error(String(error)),
        { strings, values },
      );
    }
    throw error;
  }
}

/**
 * Create component function
 */
export function component<T extends object>(
  render: (props: T, children: ElementChild[]) => Template,
): ComponentFunction<T & HTMLAttributes> {
  logger.debug("Creating component", { renderFn: render.name || "Anonymous" });

  function componentFunction(
    propsOrStrings?: T & HTMLAttributes | TemplateStringsArray,
    ...values: ElementChild[]
  ): Template {
    try {
      // Props call
      const props = (propsOrStrings as T & HTMLAttributes) ||
        ({} as T & HTMLAttributes);
      const { children: propsChildren, ...restProps } = props as {
        children?: ElementChild | ElementChild[];
      } & T;

      logger.debug("Processing props call", {
        hasChildren: Boolean(propsChildren),
        valuesCount: values.length,
        props: restProps,
      });

      const processedProps = processAttributes(
        restProps as Record<string, unknown>,
      );

      const processedChildren = propsChildren
        ? Array.isArray(propsChildren) ? propsChildren : [propsChildren]
        : values;

      // Создаем базовый шаблон
      const template = new Template({
        tag: componentFunction.tag,
        attributes: processedProps,
        children: processedChildren,
        css: componentFunction.css || "",
        rootClass: componentFunction.rootClass || "",
      });

      // Если это вызов template literal
      if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
        return template.templateLiteral(
          propsOrStrings as TemplateStringsArray,
          ...values,
        );
      }

      return template;
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Component function failed", error, {
          propsOrStrings,
          values,
        });
      } else {
        logger.error(
          "Unknown error in component function",
          new Error(String(error)),
          { propsOrStrings, values },
        );
      }
      throw error;
    }
  }

  componentFunction.isTemplate = true as const;
  componentFunction.tag = "div";
  componentFunction.css = "";
  componentFunction.rootClass = "";

  return componentFunction;
}
