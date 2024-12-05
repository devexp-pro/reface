import { createElementFactory } from "./elements.ts";
import type { Attributes } from "./types.ts";
import { salt } from "../helpers.ts";
import type { Template } from "../types.ts";

type StyledComponent = {
  className: string;
  style: string;
  factory: ReturnType<typeof createElementFactory>;
};

export function styled<T extends Attributes>(
  elementFactory: ReturnType<typeof createElementFactory<T>>
) {
  return (strings: TemplateStringsArray, ...values: any[]) => {
    const className = `s${salt()}`;
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

      // Добавляем CSS в Template
      template.css = processedCss;

      return template;
    };
  };
}
