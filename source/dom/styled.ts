import { createElementFactory } from "./elements.ts";
import type { Attributes } from "./types.ts";
import { generateUniqueClass } from "../utils.ts";
import type { Template } from "../types.ts";

export function styled<T extends Attributes>(
  elementFactory: ReturnType<typeof createElementFactory<T>>
) {
  return (strings: TemplateStringsArray, ...values: any[]) => {
    const className = generateUniqueClass();
    const cssContent = strings.reduce(
      (result, str, i) => result + str + (values[i] || ""),
      ""
    );

    const processedCss = cssContent
      .replace(/&/g, `.${className}`)
      .replace(/^([^@&.])/gm, `.${className} $1`);

    return (props: T = {} as T) => {
      const existingClass = props.class || "";
      const template: Template = elementFactory({
        ...props,
        class: `${className} ${existingClass}`.trim(),
      });

      template.css = processedCss;
      template.rootClass = className;

      return template;
    };
  };
}

export function css(strings: TemplateStringsArray, ...values: any[]) {
  const cssContent = strings.reduce(
    (result, str, i) => result + str + (values[i] || ""),
    ""
  );

  return (component: Template) => {
    const className = component.rootClass || generateUniqueClass();
    const processedCss = cssContent.replace(/\${Component}/g, `.${className}`);

    component.css = (component.css || "") + processedCss;
    component.rootClass = className;

    return component;
  };
}
