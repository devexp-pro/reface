import { TemplateComponent } from "@reface/html";
import type {
  ComponentFunction,
  ElementChild,
  HTMLAttributes,
  StyledComponent,
  StyledFactory,
} from "./types.ts";
import { generateClassName, processAttributes, processCSS } from "@reface/html";
import { createLogger } from "@reface/core";

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

  return new TemplateComponent(tag, { class: rootClass }, processedCss);
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
