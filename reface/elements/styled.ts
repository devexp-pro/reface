import type { Template } from "@reface/html";
import type {
  ComponentFunction,
  ElementChild,
  HTMLAttributes,
  TemplateLiteralFunction,
  StyledComponent,
  StyledFactory,
} from "./types.ts";
import { generateClassName, processAttributes, processCSS } from "@reface/html";

/**
 * Process template literal children
 */
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

/**
 * Create styled component
 */
function createStyledComponent<P extends HTMLAttributes>(
  tag: string,
  css: string
): StyledComponent<P> {
  const className = generateClassName();
  const processedCss = processCSS(css, className);

  function styledComponent(props: P): TemplateLiteralFunction;
  function styledComponent(
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ): Template;
  function styledComponent(
    propsOrStrings?: P | TemplateStringsArray,
    ...values: ElementChild[]
  ): TemplateLiteralFunction | Template {
    // Template literal call
    if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
      const strings = propsOrStrings as TemplateStringsArray;
      return {
        tag,
        attributes: processAttributes({ class: [className] }),
        children: processElementChildren(strings, values),
        css: processedCss,
        isTemplate: true,
        rootClass: className,
      };
    }

    // Props call
    const props = (propsOrStrings as P) || ({} as P);

    // Return template literal function
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
      } as Record<string, unknown>),
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

  styledComponent.isTemplate = true as const;
  styledComponent.tag = tag;
  styledComponent.css = processedCss;
  styledComponent.rootClass = className;

  return styledComponent;
}

/**
 * Process template strings
 */
function processTemplateStrings(
  strings: TemplateStringsArray | string,
  values?: unknown[]
): string {
  if (typeof strings === "string") return strings;
  return String.raw({ raw: strings.raw }, ...(values || []));
}

/**
 * Styled components factory
 */
export const styled = new Proxy(
  ((component: ComponentFunction) => {
    return (strings: TemplateStringsArray | string, ...values: unknown[]) => {
      const newCss = processTemplateStrings(strings, values);
      const originalCss = component.css || "";
      return createStyledComponent(component.tag, `${originalCss}\n${newCss}`);
    };
  }) as StyledFactory,
  {
    get(target, prop) {
      return (strings: TemplateStringsArray, ...values: unknown[]) => {
        const css = processTemplateStrings(strings, values);
        return createStyledComponent(prop as string, css);
      };
    },
  }
);
