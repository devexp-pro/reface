import type { ElementChild, HTMLAttributes, Template } from "../core/types.ts";
import { generateClassName } from "../html/classes.ts";
import { attributes } from "../html/attributes.ts";
import { createElementFactory } from "./createElementFactory.ts";

// Тип для функции, которая может быть вызвана как template literal
type TemplateLiteralFunction = (
  strings: TemplateStringsArray,
  ...values: ElementChild[]
) => Template;

// Тип для JSX props
type JSXProps = HTMLAttributes & { children?: ElementChild };

// Базовый тип для styled компонента
interface StyledComponent {
  // Вызов с props возвращает функцию для template literals
  (props?: HTMLAttributes): TemplateLiteralFunction;

  // JSX сигнатура - теперь соответствует JSX.Element
  (props: JSXProps): JSX.Element;

  // Метаданные для тестов и отладки
  tag: string;
  isTemplate: true;
  css: string;
}

// Тип для styled функции
interface StyledFunction {
  // Для расширения существующих компонентов
  (component: StyledComponent): {
    (strings: TemplateStringsArray, ...values: unknown[]): StyledComponent;
    (css: string): StyledComponent;
  };

  // Для HTML элементов
  [K: string]: (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ) => StyledComponent;
}

function createStyledTag(tag: string, css: string): StyledComponent {
  const className = generateClassName();
  const processedCss = css
    .replace(/&\s*{/g, `.${className} {`)
    .replace(/&\[(.*?)\]/g, `.${className}[$1]`)
    .replace(/&\.([\w-]+)/g, `.${className}.$1`)
    .replace(/&\s*([^{[.])/g, `.${className} $1`);

  // Создаем функцию-компонент
  const styledComponent = function (props: HTMLAttributes | JSXProps = {}) {
    // Если есть children, значит это JSX вызов
    if ("children" in props) {
      const classNames = [className];
      if (props.class) classNames.push(props.class);

      const { children, class: _, ...restProps } = props;

      return {
        tag,
        attributes: `class="${classNames.join(" ")}" ${attributes(
          restProps
        )}`.trim(),
        children: Array.isArray(children)
          ? children
          : children !== undefined
          ? [children]
          : [],
        css: processedCss,
        isTemplate: true,
        rootClass: className,
      };
    }

    // Иначе возвращаем функцию для template literals
    return function (
      strings: TemplateStringsArray,
      ...values: ElementChild[]
    ): Template {
      const classNames = [className];
      if (props.class) classNames.push(props.class);

      const { class: _, ...restProps } = props;
      const attrs = attributes(restProps);
      const classAttr = `class="${classNames.join(" ")}"`;

      return {
        tag,
        attributes: attrs ? `${classAttr} ${attrs}` : classAttr,
        children: values,
        css: processedCss,
        isTemplate: true,
        rootClass: className,
      };
    };
  } as StyledComponent;

  // Добавляем метаданные
  styledComponent.tag = tag;
  styledComponent.isTemplate = true;
  styledComponent.css = processedCss;

  return styledComponent;
}

function processTemplateStrings(
  strings: TemplateStringsArray | string,
  values?: unknown[]
): string {
  if (typeof strings === "string") return strings;
  return String.raw({ raw: strings.raw }, ...(values || []));
}

export const styled = new Proxy(
  (component: StyledComponent) => {
    const styleFunction = (
      strings: TemplateStringsArray | string,
      ...values: unknown[]
    ) => {
      const css = processTemplateStrings(strings, values);

      const styledComponent = function (props: HTMLAttributes = {}) {
        return function (
          strings: TemplateStringsArray,
          ...values: ElementChild[]
        ): Template {
          const baseResult = component(props)(strings, ...values);
          return {
            ...baseResult,
            css: `${baseResult.css}\n${css}`,
          };
        };
      } as StyledComponent;

      // Копируем метаданные
      styledComponent.tag = component.tag;
      styledComponent.isTemplate = true;
      styledComponent.css = css;

      return styledComponent;
    };
    return styleFunction;
  },
  {
    get(target, prop) {
      return (strings: TemplateStringsArray, ...values: unknown[]) => {
        const css = processTemplateStrings(strings, values);
        return createStyledTag(prop as string, css);
      };
    },
  }
) as StyledFunction;
