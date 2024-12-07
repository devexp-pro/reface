import type {
  ElementChild,
  ElementFactory,
  HTMLAttributes,
  Template,
} from "../core/Template.ts";
import { attributes } from "../html/attributes.ts";
import { escapeHTML } from "../html/escape.ts";
import { isTemplateFragment } from "../html/types.ts";

function processElementChildren(values: ElementChild[]): (string | Template)[] {
  return values.flatMap((value) => {
    if (value == null || value === false) return [];
    if (value === true) return [];
    if (Array.isArray(value)) {
      return processElementChildren(value);
    }
    if (isTemplateFragment(value)) {
      return [value.content];
    }
    if (typeof value === "object" && "isTemplate" in value) {
      return [value];
    }
    return [escapeHTML(String(value))];
  });
}

/**
 * Creates an element factory function for a given tag
 */
export function createElementFactory<A extends HTMLAttributes = HTMLAttributes>(
  tag: string
): ElementFactory<A> {
  function elementFactory(
    attributesOrStrings?: A | TemplateStringsArray,
    ...values: ElementChild[]
  ):
    | Template
    | ((strings: TemplateStringsArray, ...values: ElementChild[]) => Template) {
    // Если вызвана как template literal
    if (attributesOrStrings instanceof Array) {
      return {
        tag,
        attributes: "",
        children: processElementChildren(values),
        css: "",
        isTemplate: true,
        str: attributesOrStrings,
        args: values,
        rootClass: "",
      };
    }

    // Если вызвана с атрибутами, возвращаем функцию для template literals
    return function (
      strings: TemplateStringsArray,
      ...templateValues: ElementChild[]
    ): Template {
      return {
        tag,
        attributes: attributesOrStrings ? attributes(attributesOrStrings) : "",
        children: processElementChildren(templateValues),
        css: "",
        isTemplate: true,
        str: strings,
        args: templateValues,
        rootClass: "",
      };
    };
  }

  return elementFactory as ElementFactory<A>;
}

export type ElementFunction<P = Record<string, unknown>> = {
  (props?: P): Template;
  (strings: TemplateStringsArray, ...values: unknown[]): Template;
};
