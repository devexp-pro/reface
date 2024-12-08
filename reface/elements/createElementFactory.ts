import type { ElementFunction, ElementFactoryProps } from "./types.ts";

import type {
  ElementChild,
  HTMLAttributes,
  Template,
  TemplateLiteralFunction,
} from "../html/types.ts";
import { processAttributes } from "../html/attributes.ts";
import { processElementChildren } from "./component.ts";
import { createLogger } from "../core/logger.ts";
import { escapeHTML } from "../html/escape.ts";
import { isTemplateFragment } from "../html/types.ts";

const logger = createLogger("HTML");

/**
 * Creates an element factory function for a given tag
 */
export function createElementFactory<A extends HTMLAttributes = HTMLAttributes>(
  tag: string
): {
  (props: ElementFactoryProps<A>): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  isTemplate: true;
  tag: string;
} {
  function elementFactory(
    propsOrStrings?: A | TemplateStringsArray,
    ...values: ElementChild[]
  ): TemplateLiteralFunction | Template {
    // Template literal вызов
    if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
      logger.debug(`Creating template for tag "${tag}" with template literal`, {
        strings: propsOrStrings,
        values,
      });

      const template: Template = {
        tag,
        attributes: processAttributes({}),
        children: processElementChildren(propsOrStrings, values),
        isTemplate: true,
        css: "",
        rootClass: "",
      };
      return template;
    }

    // Вызов с пропсами или без
    const props = propsOrStrings || ({} as A);
    logger.debug(`Creating template literal function for tag "${tag}"`, {
      props,
    });

    // В��звращаем функцию для template literals
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
        attributes: processAttributes(props),
        children: processChildren(strings, templateValues),
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
function processChildren(
  strings: TemplateStringsArray,
  values: ElementChild[]
): ElementChild[] {
  logger.debug("Processing children", { strings, values });
  return strings.reduce((acc: ElementChild[], str, i) => {
    if (str) acc.push(str);
    if (i < values.length) {
      const value = values[i];
      // Проверяем является ли значение шаблоном или фрагментом
      if (
        (typeof value === "object" && "isTemplate" in value) ||
        isTemplateFragment(value)
      ) {
        acc.push(value);
      } else {
        acc.push(escapeHTML(String(value)));
      }
    }
    return acc;
  }, []);
}
