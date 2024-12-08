import { Template } from "@reface/html";
import type {
  ComponentFunction,
  ElementChild,
  HTMLAttributes,
  StyledComponent,
  StyledFactory,
  TemplateLiteralFunction,
} from "./types.ts";
import { generateClassName, processAttributes, processCSS } from "@reface/html";
import { createLogger } from "@reface/core";

const logger = createLogger("Styled");

/**
 * Process template literal children
 */
function processElementChildren(
  strings: TemplateStringsArray,
  values: ElementChild[],
): ElementChild[] {
  logger.debug("Processing template children", {
    stringsCount: strings.length,
    valuesCount: values.length,
  });

  return strings.reduce((acc: ElementChild[], str, i) => {
    if (str) acc.push(str);
    if (i < values.length) acc.push(values[i]);
    return acc;
  }, []);
}

/**
 * Create styled component
 */
function createStyledComponent<P extends HTMLAttributes>(
  tag: string,
  css: string,
): StyledComponent<P> {
  const rootClass = generateClassName();
  const processedCss = processCSS(css, rootClass);

  function styledFactory(
    propsOrStrings?: P | TemplateStringsArray,
    ...values: ElementChild[]
  ): Template {
    // Template literal call
    if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
      const strings = propsOrStrings as TemplateStringsArray;
      return new Template({
        tag,
        attributes: { class: rootClass },
        children: [],
        css: processedCss,
        rootClass,
      }).templateLiteral(strings, ...values);
    }

    // Props call
    const props = (propsOrStrings || {}) as P;
    return new Template({
      tag,
      attributes: { ...processAttributes(props), class: rootClass },
      children: [],
      css: processedCss,
      rootClass,
    });
  }

  styledFactory.isTemplate = true as const;
  styledFactory.tag = tag;
  styledFactory.css = processedCss;
  styledFactory.rootClass = rootClass;

  return styledFactory as StyledComponent<P>;
}

/**
 * Process template strings
 */
function processTemplateStrings(
  strings: TemplateStringsArray | string,
  values?: unknown[],
): string {
  logger.debug("Processing template strings", {
    isTemplateStrings: Array.isArray(strings),
    valuesCount: values?.length,
  });

  if (typeof strings === "string") return strings;
  return String.raw({ raw: strings.raw }, ...(values || []));
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
        const newCss = processTemplateStrings(strings, values);
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
          const css = processTemplateStrings(strings, values);
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
