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

// Тип для styled компонента, который поддерживает как JSX, так и template literal синтаксис
export type StyledComponent = {
  (props?: Record<string, unknown>): Template;
  (strings: TemplateStringsArray, ...values: unknown[]): Template;
};

export const styled = {
  div: (
    styles: TemplateStringsArray,
    ...values: unknown[]
  ): StyledComponent => {
    // Генерируем уникальный класс
    const className = `c${Math.random().toString(36).slice(2, 8)}`;

    // Собираем CSS из template literal
    const css = styles
      .reduce((acc, str, i) => acc + str + (values[i] || ""), "")
      .replace(/&/g, `.${className}`);

    const component = ((
      propsOrStrings?: Record<string, unknown> | TemplateStringsArray,
      ...children: ElementChild[]
    ): Template => {
      // Если вызван как JSX компонент
      if (!(propsOrStrings instanceof Array)) {
        const props = propsOrStrings || {};

        return {
          tag: "div",
          attributes: attributes({
            ...props,
            class: className,
            children: undefined, // Явно удаляем children из атрибутов
          }),
          children: processElementChildren(children),
          css,
          isTemplate: true,
          str: [""] as unknown as TemplateStringsArray,
          args: [],
          rootClass: className,
        };
      }

      // Если вызван как template literal
      return {
        tag: "div",
        attributes: attributes({ class: className }),
        children: processElementChildren(children),
        css,
        isTemplate: true,
        str: propsOrStrings,
        args: children,
        rootClass: className,
      };
    }) as StyledComponent;

    return component;
  },

  span: (
    styles: TemplateStringsArray,
    ...values: unknown[]
  ): StyledComponent => {
    // Генерируем уникальный класс
    const className = `c${Math.random().toString(36).slice(2, 8)}`;

    // Собираем CSS из template literal
    const css = styles
      .reduce((acc, str, i) => acc + str + (values[i] || ""), "")
      .replace(/&/g, `.${className}`);

    const component = ((
      propsOrStrings?: Record<string, unknown> | TemplateStringsArray,
      ...children: ElementChild[]
    ) => {
      // Если вызван как JSX компонент
      if (!(propsOrStrings instanceof Array)) {
        const props = propsOrStrings || {};
        const classes = [className];
        if (props.class) {
          classes.push(props.class as string);
        }

        return {
          tag: "span",
          attributes: attributes({ ...props, class: classes.join(" ") }),
          children: processElementChildren(children),
          css,
          isTemplate: true,
          rootClass: className,
        };
      }

      // Если вызван как template literal
      return {
        tag: "span",
        attributes: attributes({ class: className }),
        children: processElementChildren(children),
        css,
        isTemplate: true,
        str: propsOrStrings,
        args: children,
        rootClass: className,
      };
    }) as StyledComponent;

    return component;
  },
};
