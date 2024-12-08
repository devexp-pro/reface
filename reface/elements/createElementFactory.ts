import type {
  ElementChild,
  HTMLAttributes,
  Template,
  TemplateLiteralFunction,
  TemplateAttributes,
} from "../core/types.ts";
import { processAttributes } from "../html/attributes.ts";

/**
 * Creates an element factory function for a given tag
 */
export function createElementFactory<A extends HTMLAttributes = HTMLAttributes>(
  tag: string
): {
  (props?: A): TemplateLiteralFunction;
  (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
} {
  function elementFactory(
    propsOrStrings?: A | TemplateStringsArray,
    ...values: ElementChild[]
  ): TemplateLiteralFunction | Template {
    // Template literal вызов
    if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
      return {
        tag,
        attributes: processAttributes({}),
        children: processChildren(propsOrStrings, values),
        isTemplate: true,
        tag,
      };
    }

    // Вызов с пропсами или без
    const props = propsOrStrings || ({} as A);

    // Возвращаем функцию для template literals
    const templateLiteralFn = (
      strings: TemplateStringsArray,
      ...templateValues: ElementChild[]
    ): Template => ({
      tag,
      attributes: processAttributes(props),
      children: processChildren(strings, templateValues),
      isTemplate: true,
      tag,
    });

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
  return strings.reduce((acc: ElementChild[], str, i) => {
    if (str) acc.push(str);
    if (i < values.length) acc.push(values[i]);
    return acc;
  }, []);
}

export type ElementFunction<P = Record<string, unknown>> = {
  (props?: P): Template;
  (strings: TemplateStringsArray, ...values: unknown[]): Template;
};
