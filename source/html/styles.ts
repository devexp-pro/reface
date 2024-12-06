import type { Template } from "../core/Template.ts";

/**
 * Style interpolation types
 */
export type StyleInterpolation =
  | string
  | number
  | (() => Template)
  | { css: string };

/**
 * Process style template and interpolations
 */
export function processStyles(
  strings: TemplateStringsArray,
  values: StyleInterpolation[],
  className: string
): string {
  // Process interpolations
  let css = strings
    .reduce((result, str, i) => {
      const value = values[i];
      if (!value) return result + str;

      // Handle functions
      if (typeof value === "function") {
        return result + str + `.${value().rootClass}`;
      }

      // Handle nested styles
      if (typeof value === "object" && "css" in value) {
        return result + str + value.css;
      }

      return result + str + String(value);
    }, "")
    .trim();

  // Process selectors
  css = css
    // Replace & with class name
    .replace(/&\s*{/g, `.${className} {`)
    // Handle nested selectors
    .replace(/&\s*(\${|\.)/g, `.${className} $1`)
    // Handle direct class selectors
    .replace(/&\s+\./g, `.${className} .`);

  return css;
}
