import type { Template } from "@reface/html";
import type {
  ElementFunction,
  ElementChild,
  HTMLAttributes,
  TemplateLiteralFunction,
} from "./types.ts";
import { processAttributes } from "@reface/html";
import { processElementChildren } from "./component.ts";
import { createLogger } from "@reface/core";

const logger = createLogger("Elements");

/**
 * Creates an element factory function for a given tag
 */
export function createElementFactory<A extends HTMLAttributes = HTMLAttributes>(
  tag: string
): ElementFunction<A> {
  logger.debug(`Creating element factory for "${tag}"`);

  function elementFactory(props: A): TemplateLiteralFunction;
  function elementFactory(
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ): Template;
  function elementFactory(
    propsOrStrings?: A | TemplateStringsArray,
    ...values: ElementChild[]
  ): TemplateLiteralFunction | Template {
    try {
      // Template literal call
      if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
        logger.debug(`Creating template for "${tag}" with template literal`, {
          strings: propsOrStrings,
          valuesCount: values.length,
        });

        const strings = propsOrStrings as TemplateStringsArray;
        return {
          tag,
          attributes: processAttributes({}),
          children: processElementChildren(strings, values),
          isTemplate: true as const,
          css: "",
          rootClass: "",
        };
      }

      // Props call
      const props = (propsOrStrings as A) || ({} as A);
      logger.debug(`Creating template literal function for "${tag}"`, {
        props,
      });

      // Return template literal function
      const templateLiteralFn = (
        strings: TemplateStringsArray,
        ...templateValues: ElementChild[]
      ): Template => {
        try {
          logger.debug(`Executing template literal function for "${tag}"`, {
            strings,
            valuesCount: templateValues.length,
          });

          const template = {
            tag,
            attributes: processAttributes(props as Record<string, unknown>),
            children: processElementChildren(strings, templateValues),
            isTemplate: true as const,
            css: "",
            rootClass: "",
          };

          logger.info(`Created template for "${tag}"`, {
            attributesCount: Object.keys(template.attributes).length,
            childrenCount: template.children.length,
          });

          return template;
        } catch (error: unknown) {
          if (error instanceof Error) {
            logger.error(`Failed to create template for "${tag}"`, error, {
              strings,
              templateValues,
            });
          } else {
            logger.error(
              `Unknown error creating template for "${tag}"`,
              new Error(String(error)),
              { strings, templateValues }
            );
          }
          throw error;
        }
      };

      return Object.assign(templateLiteralFn, {
        isTemplate: true as const,
        tag,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error(`Element factory error for "${tag}"`, error, {
          propsOrStrings,
          values,
        });
      } else {
        logger.error(
          `Unknown element factory error for "${tag}"`,
          new Error(String(error)),
          { propsOrStrings, values }
        );
      }
      throw error;
    }
  }

  elementFactory.isTemplate = true as const;
  elementFactory.tag = tag;

  return elementFactory;
}
