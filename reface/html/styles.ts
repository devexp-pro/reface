import type { Template } from "../core/Template.ts";

/**
 * Style interpolation types
 */
export type StyleInterpolation =
  | string
  | number
  | boolean
  | undefined
  | null
  | (() => Template);

function processSelectors(css: string, className: string): string {
  return (
    css
      // Замена & { на .className {
      .replace(/&\s*{/g, `.${className} {`)
      // Замена & .class на .className .class
      .replace(/&\s+\./g, `.${className} .`)
      // Замена &:pseudo на .className:pseudo
      .replace(/&([:.])/g, `.${className}$1`)
      // Замена & .class на .className .class
      .replace(/&\s+([^{]+)/g, `.${className} $1`)
  );
}

/**
 * Process style template and interpolations
 */
export function processStyles(
  strings: TemplateStringsArray,
  values: StyleInterpolation[],
  className: string
): string {
  // Combine strings and values
  let css = strings.reduce((result, str, i) => {
    const value = values[i];
    return result + str + (value !== undefined ? value : "");
  }, "");

  // Process selectors
  css = processSelectors(css, className);

  return css;
}
