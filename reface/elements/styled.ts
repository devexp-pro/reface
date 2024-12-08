import type { Template } from "@reface/html";
import type {
  ComponentFunction,
  ElementChild,
  HTMLAttributes,
  TemplateLiteralFunction,
  StyledComponent,
  StyledFactory,
} from "./types.ts";
import { generateClassName, processAttributes, processCSS } from "@reface/html";
import { createLogger } from "@reface/core";

const logger = createLogger("Styled");

/**
 * Process template literal children
 */
function processElementChildren(
  strings: TemplateStringsArray,
  values: ElementChild[]
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
  css: string
): StyledComponent<P> {
  logger.debug("Creating styled component", { tag });

  const className = generateClassName();
  logger.debug("Generated class name", { className });

  try {
    const processedCss = processCSS(css, className);
    logger.debug("Processed CSS", { processedCss });

    function styledComponent(props: P): TemplateLiteralFunction;
    function styledComponent(
      strings: TemplateStringsArray,
      ...values: ElementChild[]
    ): Template;
    function styledComponent(
      propsOrStrings?: P | TemplateStringsArray,
      ...values: ElementChild[]
    ): TemplateLiteralFunction | Template {
      try {
        // Template literal call
        if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
          logger.debug("Creating template with template literal", {
            tag,
            valuesCount: values.length,
          });

          const strings = propsOrStrings as TemplateStringsArray;
          return {
            tag,
            attributes: processAttributes({ class: [className] }),
            children: processElementChildren(strings, values),
            css: processedCss,
            isTemplate: true as const,
            rootClass: className,
          };
        }

        // Props call
        const props = (propsOrStrings as P) || ({} as P);
        logger.debug("Creating template with props", { tag, props });

        // Return template literal function
        const templateLiteralFn = (
          strings: TemplateStringsArray,
          ...templateValues: ElementChild[]
        ): Template => {
          try {
            logger.debug("Executing template literal function", {
              tag,
              valuesCount: templateValues.length,
            });

            const combinedClasses = [
              className,
              ...(Array.isArray(props.class)
                ? props.class
                : props.class
                ? [props.class]
                : []),
            ];

            const template = {
              tag,
              attributes: processAttributes({
                ...props,
                class: combinedClasses,
              } as Record<string, unknown>),
              children: processElementChildren(strings, templateValues),
              css: processedCss,
              isTemplate: true as const,
              rootClass: className,
            };

            logger.info("Created styled template", {
              tag,
              className,
              classCount: combinedClasses.length,
              childrenCount: template.children.length,
            });

            return template;
          } catch (error: unknown) {
            if (error instanceof Error) {
              logger.error("Failed to create styled template", error, {
                tag,
                strings,
                templateValues,
              });
            } else {
              logger.error(
                "Unknown error creating styled template",
                new Error(String(error)),
                { tag, strings, templateValues }
              );
            }
            throw error;
          }
        };

        return Object.assign(templateLiteralFn, {
          isTemplate: true as const,
          tag,
          css: processedCss,
          rootClass: className,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          logger.error("Styled component error", error, {
            tag,
            propsOrStrings,
            values,
          });
        } else {
          logger.error(
            "Unknown styled component error",
            new Error(String(error)),
            { tag, propsOrStrings, values }
          );
        }
        throw error;
      }
    }

    styledComponent.isTemplate = true as const;
    styledComponent.tag = tag;
    styledComponent.css = processedCss;
    styledComponent.rootClass = className;

    logger.info("Created styled component", {
      tag,
      className,
      cssLength: processedCss.length,
    });

    return styledComponent;
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error("Failed to create styled component", error, { tag, css });
    } else {
      logger.error(
        "Unknown error creating styled component",
        new Error(String(error)),
        { tag, css }
      );
    }
    throw error;
  }
}

/**
 * Process template strings
 */
function processTemplateStrings(
  strings: TemplateStringsArray | string,
  values?: unknown[]
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
          `${originalCss}\n${newCss}`
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
            { tag: component.tag, strings, values }
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
              { tag: String(prop), strings, values }
            );
          }
          throw error;
        }
      };
    },
  }
);
