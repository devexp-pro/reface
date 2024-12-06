import type { Template } from "../types.ts";
import type { Attributes } from "../dom/types/mod.ts";
import { createElementFactory } from "../elements/mod.ts";
import { generateUniqueClass } from "../utils.ts";
import type { ElementChild } from "../dom/types/base.ts";
import type { StyledComponent } from "./types.ts";
import * as elements from "../elements/mod.ts";

type ElementsMap = typeof elements;

function createStyled<T extends Attributes>(
  elementFactory: ReturnType<typeof createElementFactory<T>>
) {
  return (strings: TemplateStringsArray, ...values: ElementChild[]) => {
    const className = generateUniqueClass();
    const tag = elementFactory.name.toLowerCase();

    // CSS processing logic...
    let css = strings
      .reduce((result, str, i) => {
        const value = values[i];
        if (value && typeof value === "function" && "rootClass" in value()) {
          return result + str + `.${value().rootClass}`;
        }
        return result + str + (value || "");
      }, "")
      .trim();

    css = css
      .replace(/&\s*{/g, `.${className} {`)
      .replace(/&\s*\${/g, `.${className} .`)
      .replace(/&\s+\./g, `.${className} .`);

    const styledComponent = ((props: T = {} as T) => {
      const existingClass = props.class || "";
      const elementFn = elementFactory({
        ...props,
        class: `${className} ${existingClass}`.trim(),
      });

      const emptyTemplate = Object.assign([""], {
        raw: [""],
      }) as TemplateStringsArray;

      const baseTemplate = elementFn(emptyTemplate);

      const template: Template = {
        ...baseTemplate,
        css,
        rootClass: className,
      };

      const result = Object.assign(
        (newStrings?: TemplateStringsArray, ...newValues: ElementChild[]) => {
          if (!newStrings) return template;
          return {
            ...elementFn(newStrings, ...newValues),
            css,
            rootClass: className,
          };
        },
        template
      );

      return result;
    }) as StyledComponent<T>;

    return styledComponent;
  };
}

// Создаем базовую функцию styled
export function styled<T extends Attributes>(
  component: ReturnType<typeof createElementFactory<T>> | StyledComponent<T>
) {
  return createStyled(component);
}

// Добавляем методы для каждого HTML элемента
type StyledElements = {
  [K in keyof ElementsMap]: ReturnType<typeof createStyled<any>>;
};

const styledElements = Object.entries(elements).reduce(
  (acc, [key, element]) => ({
    ...acc,
    [key]: createStyled(element),
  }),
  {}
) as StyledElements;

// Объединяем базовую функцию с методами элементов
export const styledApi = Object.assign(styled, styledElements);

// Экспортируем как default и named export
export default styledApi;
export { css } from "../dom/css.ts";
