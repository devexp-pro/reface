import { Template } from "@reface/html";
import type {
  ComponentFunction,
  ElementChild,
  HTMLAttributes,
  StyledComponent,
  StyledFactory,
} from "./types.ts";
import { generateClassName, processAttributes, processCSS } from "@reface/html";
import { createLogger } from "@reface/core";
import { TemplateText } from "@reface/html";

const logger = createLogger("Styled");

/**
 * Create styled component
 */
function createStyledComponent<P extends HTMLAttributes>(
  tag: string,
  css: string,
): StyledComponent<P> {
  const rootClass = generateClassName();
  const processedCss = processCSS(css, rootClass);

  // Создаем основную функцию компонента
  function componentFn(props?: P, children?: ElementChild[]) {
    logger.debug("Component called with props", {
      props,
      hasChildren: Boolean(children),
    });

    const attributes = processAttributes(props || {});
    attributes.class = Array.isArray(attributes.class)
      ? [rootClass, ...attributes.class]
      : [rootClass];

    // Если переданы children, создаем Template сразу
    if (children) {
      return new Template({
        tag,
        attributes,
        children,
        css: processedCss,
        rootClass,
      });
    }

    // Возвращаем функцию для template literals
    return (
      strings: TemplateStringsArray,
      ...values: ElementChild[]
    ): Template => {
      logger.debug("Template literal called", {
        stringsCount: strings.length,
        valuesCount: values.length,
      });

      const result: ElementChild[] = [];

      for (let i = 0; i < strings.length; i++) {
        if (strings[i]) {
          result.push(strings[i]);
        }

        if (i < values.length) {
          const value = values[i];
          if (value != null) {
            if (Array.isArray(value)) {
              result.push(
                ...value.map((v) =>
                  v instanceof Template ? v : new TemplateText(String(v))
                ),
              );
            } else if (value instanceof Template) {
              result.push(value);
            } else {
              result.push(new TemplateText(String(value)));
            }
          }
        }
      }

      return new Template({
        tag,
        attributes,
        children: result,
        css: processedCss,
        rootClass,
      });
    };
  }

  return Object.assign(componentFn, {
    isTemplate: true as const,
    tag,
    css: processedCss,
    rootClass,
  });
}

/**
 * Styled components factory
 */
export const styled = new Proxy(
  ((component: ComponentFunction) => {
    logger.debug("Extending component with styles", {
      tag: component.tag,
      hasExistingCss: Boolean(component.css),
    });

    return (strings: TemplateStringsArray | string, ...values: unknown[]) => {
      try {
        const newCss = typeof strings === "string"
          ? strings
          : String.raw({ raw: strings.raw }, ...(values || []));
        const originalCss = component.css || "";

        logger.debug("Combining CSS", {
          originalLength: originalCss.length,
          newLength: newCss.length,
        });

        return createStyledComponent(
          component.tag,
          `${originalCss}\n${newCss}`,
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          logger.error("Failed to extend component", error, {
            tag: component.tag,
            strings,
            values,
          });
        } else {
          logger.error(
            "Unknown error extending component",
            new Error(String(error)),
            { tag: component.tag, strings, values },
          );
        }
        throw error;
      }
    };
  }) as StyledFactory,
  {
    get(target, prop) {
      logger.debug("Creating new styled component", { tag: String(prop) });

      return (strings: TemplateStringsArray, ...values: unknown[]) => {
        try {
          const css = typeof strings === "string"
            ? strings
            : String.raw({ raw: strings.raw }, ...(values || []));
          return createStyledComponent(prop as string, css);
        } catch (error: unknown) {
          if (error instanceof Error) {
            logger.error("Failed to create new styled component", error, {
              tag: String(prop),
              strings,
              values,
            });
          } else {
            logger.error(
              "Unknown error creating new styled component",
              new Error(String(error)),
              { tag: String(prop), strings, values },
            );
          }
          throw error;
        }
      };
    },
  },
);
