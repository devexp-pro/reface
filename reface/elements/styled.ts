import type {
  StyledComponent,
  StyledFactory,
  StyledComponentOptions,
  HTMLAttributes,
  ElementChild,
  Template,
  TemplateLiteralFunction,
} from "./types.ts";
import { generateClassName } from "../html/classes.ts";
import { processAttributes } from "../html/attributes.ts";
import { processCSS } from "../html/styles.ts";

function processElementChildren(
  strings: TemplateStringsArray,
  values: ElementChild[]
): ElementChild[] {
  return strings.reduce((acc: ElementChild[], str, i) => {
    if (str) acc.push(str);
    if (i < values.length) acc.push(values[i]);
    return acc;
  }, []);
}

function createStyledComponent<P extends HTMLAttributes>(
  tag: string,
  css: string
): StyledComponent<P> {
  const className = generateClassName();
  const processedCss = processCSS(css, className);

  function templateLiteralCall(
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ): Template {
    return {
      tag,
      attributes: processAttributes({ class: [className] }),
      children: processElementChildren(strings, values),
      css: processedCss,
      isTemplate: true,
      rootClass: className,
    };
  }

  function styledComponent(
    propsOrStrings?: P | TemplateStringsArray,
    ...values: ElementChild[]
  ): TemplateLiteralFunction | Template {
    // Template literal вызов
    if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
      return templateLiteralCall(
        propsOrStrings as TemplateStringsArray,
        values
      );
    }

    // JSX вызов или вызов с пропсами
    const props = propsOrStrings || ({} as P);

    // Если нет дополнительных значений, возвращаем TemplateLiteralFunction
    if (values.length === 0) {
      const templateLiteralFn = (
        strings: TemplateStringsArray,
        ...templateValues: ElementChild[]
      ): Template => ({
        tag,
        attributes: processAttributes({
          ...props,
          class: [
            className,
            ...(Array.isArray(props.class)
              ? props.class
              : props.class
              ? [props.class]
              : []),
          ],
        }),
        children: processElementChildren(strings, templateValues),
        css: processedCss,
        isTemplate: true,
        rootClass: className,
      });

      return Object.assign(templateLiteralFn, {
        isTemplate: true as const,
        tag,
        css: processedCss,
        rootClass: className,
      });
    }

    return {
      tag,
      attributes: processAttributes({
        ...props,
        class: [
          className,
          ...(Array.isArray(props.class)
            ? props.class
            : props.class
            ? [props.class]
            : []),
        ],
      }),
      children: values,
      css: processedCss,
      isTemplate: true,
      rootClass: className,
    };
  }

  styledComponent.isTemplate = true as const;
  styledComponent.tag = tag;
  styledComponent.css = processedCss;
  styledComponent.rootClass = className;

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
  ((component: ComponentFunction) => {
    return (strings: TemplateStringsArray | string, ...values: unknown[]) => {
      const newCss = processTemplateStrings(strings, values);
      const originalCss = component.css || "";
      return createStyledComponent(component.tag, `${originalCss}\n${newCss}`);
    };
  }) as unknown as StyledFactory,
  {
    get(target, prop) {
      return (strings: TemplateStringsArray, ...values: unknown[]) => {
        const css = processTemplateStrings(strings, values);
        return createStyledComponent(prop as string, css);
      };
    },
  }
);
