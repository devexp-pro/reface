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

const logger = createLogger("HTML");

/**
 * Creates an element factory function for a given tag
 */
export function createElementFactory<A extends HTMLAttributes = HTMLAttributes>(
  tag: string
): ElementFunction<A> {
  function elementFactory(props: A): TemplateLiteralFunction;
  function elementFactory(
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ): Template;
  function elementFactory(
    propsOrStrings?: A | TemplateStringsArray,
    ...values: ElementChild[]
  ): TemplateLiteralFunction | Template {
    // Template literal call
    if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
      logger.debug(`Creating template for tag "${tag}" with template literal`, {
        strings: propsOrStrings,
        values,
      });

      const strings = propsOrStrings as TemplateStringsArray;
      return {
        tag,
        attributes: processAttributes({}),
        children: processElementChildren(strings, values),
        isTemplate: true,
        css: "",
        rootClass: "",
      };
    }

    // Props call
    const props = (propsOrStrings as A) || ({} as A);
    logger.debug(`Creating template literal function for tag "${tag}"`, {
      props,
    });

    // Return template literal function
    const templateLiteralFn = (
      strings: TemplateStringsArray,
      ...templateValues: ElementChild[]
    ): Template => {
      logger.debug(`Executing template literal function for tag "${tag}"`, {
        strings,
        values: templateValues,
      });

      return {
        tag,
        attributes: processAttributes(props as Record<string, unknown>),
        children: processElementChildren(strings, templateValues),
        isTemplate: true,
        css: "",
        rootClass: "",
      };
    };

    return Object.assign(templateLiteralFn, {
      isTemplate: true as const,
      tag,
    });
  }

  elementFactory.isTemplate = true as const;
  elementFactory.tag = tag;

  return elementFactory;
}
