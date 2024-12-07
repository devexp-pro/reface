import type {
  ElementChild,
  ElementFactory,
  HTMLAttributes,
  Template,
} from "../core/Template.ts";
import { attributes } from "../html/mod.ts";
import type { TemplateFragment } from "../html/types.ts";
import { isTemplateFragment } from "../html/types.ts";
import { escapeHTML } from "../html/escape.ts";

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
      // Собираем все части шаблона
      const children: (string | Template)[] = [];
      attributesOrStrings.forEach((str, i) => {
        // Добавляем текст
        if (str) children.push(escapeHTML(str));
        // Добавляем значение если есть
        if (i < values.length) {
          const value = values[i];
          if (value === null || value === undefined) return;
          if (isTemplateFragment(value)) children.push(value.content);
          else if (typeof value === "object" && "isTemplate" in value)
            children.push(value);
          else children.push(escapeHTML(String(value)));
        }
      });

      return {
        tag,
        attributes: "",
        children,
        css: "",
        isTemplate: true,
        str: attributesOrStrings,
        args: values.map(String),
        rootClass: "",
      };
    }

    // Если вызвана с атрибутами, возвращаем функцию для template literals
    return function (
      strings: TemplateStringsArray,
      ...templateValues: ElementChild[]
    ): Template {
      // Собираем все части шаблона
      const children: (string | Template)[] = [];
      strings.forEach((str, i) => {
        // Добавляем текст
        if (str) children.push(escapeHTML(str));
        // Добавляем значение если есть
        if (i < templateValues.length) {
          const value = templateValues[i];
          if (value === null || value === undefined) return;
          if (isTemplateFragment(value)) children.push(value.content);
          else if (typeof value === "object" && "isTemplate" in value)
            children.push(value);
          else children.push(escapeHTML(String(value)));
        }
      });

      return {
        tag,
        attributes: attributesOrStrings ? attributes(attributesOrStrings) : "",
        children,
        css: "",
        isTemplate: true,
        str: strings,
        args: templateValues.map(String),
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
