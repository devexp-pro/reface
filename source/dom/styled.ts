import type { Template } from "../types.ts";
import type { Attributes } from "./types/mod.ts";
import { createElementFactory } from "./elements.ts";
import { generateUniqueClass } from "../utils.ts";
import type { ElementChild } from "./types/base.ts";

type StyledComponent<T> = {
  (props?: T): Template & {
    (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  };
};

export function styled<T extends Attributes>(
  elementFactory: ReturnType<typeof createElementFactory<T>>
) {
  return (strings: TemplateStringsArray, ...values: ElementChild[]) => {
    const className = generateUniqueClass();
    const cssContent = strings.reduce(
      (result, str, i) => result + str + (values[i] || ""),
      ""
    );

    const processedCss = cssContent
      .replace(/&/g, `.${className}`)
      .replace(/^([^@&.])/gm, `.${className} $1`);

    const styledComponent = ((props: T = {} as T) => {
      const existingClass = props.class || "";
      const elementFn = elementFactory({
        ...props,
        class: `${className} ${existingClass}`.trim(),
      });

      const baseTemplate = elementFn(strings, ...values);
      const template: Template = {
        ...baseTemplate,
        css: processedCss,
        rootClass: className,
      };

      const result = Object.assign(
        (newStrings?: TemplateStringsArray, ...newValues: ElementChild[]) => {
          if (!newStrings) return template;
          return {
            ...elementFn(newStrings, ...newValues),
            css: processedCss,
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

export { css } from "./css.ts";
