import type { Template } from "../core/types.ts";
import { attributes } from "../html/mod.ts";
import type { StyledComponent, StyledFactory } from "./styled.types.ts";
import { createElementFactory } from "./factory.ts";

function createStyledTag(tag: string): StyledFactory {
  return (strings: TemplateStringsArray, ...values: unknown[]) => {
    const css = String.raw(strings, ...values);

    // Создаем базовый элемент
    const baseElement = createElementFactory(tag);

    // Создаем функцию-фабрику для styled component
    function styledElement(props: Record<string, unknown> = {}) {
      // Получаем функцию для template literals от базового элемента
      const templateFn = baseElement(props);

      // Возвращаем функцию для template literals
      const elementWithTemplate = function (
        strings: TemplateStringsArray,
        ...values: unknown[]
      ) {
        // Создаем Template с children
        return {
          tag,
          attributes: attributes(props),
          css,
          isTemplate: true,
          children: values,
          str: strings,
          args: values,
          rootClass: "",
        };
      };

      // Копируем все свойства с базового элемента
      Object.assign(elementWithTemplate, templateFn);

      return elementWithTemplate;
    }

    // Копируем все свойства с базового элемента
    Object.assign(styledElement, baseElement);

    // Обновляем свойства для styled component
    Object.assign(styledElement, {
      css,
      isTemplate: true,
    });

    return styledElement;
  };
}

// Создаем функцию для расширения компонентов
function extendComponent(base: StyledComponent): StyledFactory {
  return (strings: TemplateStringsArray, ...values: unknown[]) => {
    const css = String.raw(strings, ...values);

    return (props: Record<string, unknown> = {}) => {
      const baseResult = base(props);
      return {
        ...baseResult,
        css: `${baseResult.css || ""}\n${css}`,
      };
    };
  };
}

// Создаем базовую функцию styled
const baseStyled = (component: StyledComponent): StyledFactory => {
  return extendComponent(component);
};

// Создаем прокси для тегов
export const styled = new Proxy(baseStyled, {
  get(target, prop) {
    if (typeof prop === "string") {
      return createStyledTag(prop);
    }
    return target[prop as keyof typeof target];
  },
}) as typeof baseStyled & { [key: string]: StyledFactory };
