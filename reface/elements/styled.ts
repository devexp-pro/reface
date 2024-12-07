import type {
  ElementChild,
  ElementFactory,
  HTMLAttributes,
} from "@reface/core";
import type { StyledComponent, StyledFactory } from "./styled.types.ts";
import * as elements from "./elements.ts";
import { generateClassName } from "@reface/html";

function createStyledTag(
  elementFactory: ElementFactory<HTMLAttributes>
): StyledFactory {
  return (strings: TemplateStringsArray, ...values: unknown[]) => {
    const className = generateClassName();
    const css = String.raw(strings, ...values)
      .replace(/&\s*{/g, `.${className} {`)
      .replace(/&\s*\${/g, `.${className} .`)
      .replace(/&\s+\./g, `.${className} .`);

    return (props: HTMLAttributes & { children?: ElementChild } = {}) => {
      const { children, ...restProps } = props;
      const emptyTemplate = Object.assign([""], {
        raw: [""],
      }) as TemplateStringsArray;

      const baseResult = elementFactory({
        ...restProps,
        class: `${className} ${props.class || ""}`.trim(),
      })(emptyTemplate, children || "");

      return {
        ...baseResult,
        css,
        rootClass: className,
      };
    };
  };
}

// Создаем базовую функцию styled
const baseStyled = (component: StyledComponent): StyledFactory => {
  return (strings: TemplateStringsArray, ...values: unknown[]) => {
    const css = String.raw(strings, ...values);

    return (props: HTMLAttributes = {}) => {
      const baseResult = component(props);
      return {
        ...baseResult,
        css: `${baseResult.css || ""}\n${css}`,
      };
    };
  };
};

// Создаем прокси для тегов
export const styled = new Proxy(baseStyled, {
  get(target, prop) {
    if (prop in elements) {
      return createStyledTag(elements[prop as keyof typeof elements]);
    }
    throw new Error(`Tag ${String(prop)} not found`);
  },
}) as typeof baseStyled & { [key: string]: StyledFactory };
