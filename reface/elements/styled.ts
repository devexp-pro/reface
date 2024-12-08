import type {
  ElementChild,
  HTMLAttributes,
  Template,
  ComponentFunction,
  TemplateLiteralFunction,
} from "../core/types.ts";
import type { StyledComponent, StyledFactory } from "./styled.types.ts";
import { generateClassName } from "../html/classes.ts";
import { attributes } from "../html/attributes.ts";

function processCss(css: string, className: string): string {
  return css
    .replace(/&\s*{/g, `.${className} {`)
    .replace(/&\[(.*?)\]/g, `.${className}[$1]`)
    .replace(/&\.([\w-]+)/g, `.${className}.$1`)
    .replace(/&:([\w-]+)/g, `.${className}:$1`)
    .replace(/&\s*([^{[.:])/g, `.${className} $1`);
}

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

function createAttributes(
  className: string,
  customClass?: string,
  props: Record<string, unknown> = {}
): string {
  const classNames = [className];
  if (customClass) classNames.push(customClass);

  const classAttr = `class="${classNames.join(" ")}"`;
  const otherAttrs = Object.keys(props).length ? attributes(props) : "";

  return `${classAttr}${otherAttrs ? " " + otherAttrs : ""}`.trim();
}

function createStyledComponent<P extends HTMLAttributes>(
  tag: string,
  css: string
): StyledComponent<P> {
  const className = generateClassName();
  const processedCss = processCss(css, className);

  function templateLiteralCall(
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ): Template {
    return {
      tag,
      attributes: createAttributes(className),
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
      return templateLiteralCall(propsOrStrings, values);
    }

    // JSX вызов или вызов с пропсами
    const props = propsOrStrings || ({} as P);

    // Если нет дополнительных значений, возвращаем TemplateLiteralFunction
    if (values.length === 0) {
      const templateLiteralFn = (
        strings: TemplateStringsArray,
        ...templateValues: ElementChild[]
      ) => ({
        tag,
        attributes: createAttributes(className, props.class, props),
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
      attributes: createAttributes(className, props.class, props),
      children: Array.isArray(props.children)
        ? props.children
        : props.children
        ? [props.children]
        : [],
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
