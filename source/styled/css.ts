import { generateClassName } from "../helpers/generateClassName.ts";
import type { Template } from "../types.ts";

export function css(strings: TemplateStringsArray, ...values: unknown[]) {
  const cssContent = strings.reduce(
    (result, str, i) => result + str + (values[i] || ""),
    ""
  );

  return (component: Template) => {
    const className = component.rootClass || generateClassName();
    const processedCss = cssContent.replace(/\${Component}/g, `.${className}`);

    component.css = (component.css || "") + processedCss;
    component.rootClass = className;

    return component;
  };
}

export function cssVar(name: string, value?: string): string {
  if (value === undefined) {
    return `var(--${name})`;
  }
  return `--${name}: ${value}`;
}
