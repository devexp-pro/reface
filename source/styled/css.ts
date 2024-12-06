import type { Template } from "../types/mod.ts";

/**
 * CSS template literal tag
 */
export function css(strings: TemplateStringsArray, ...values: unknown[]) {
  return (component: Template) => {
    const className = component.rootClass;
    const cssContent = processCssTemplate(strings, values, className);

    component.css = (component.css || "") + cssContent;
    return component;
  };
}

/**
 * Process CSS template with interpolations
 */
function processCssTemplate(
  strings: TemplateStringsArray,
  values: unknown[],
  className: string
): string {
  // Process interpolations
  let css = strings
    .reduce((result, str, i) => {
      const value = values[i];
      if (!value) return result + str;

      // Handle nested styles
      if (typeof value === "object" && "css" in value) {
        return result + str + value.css;
      }

      // Handle functions
      if (typeof value === "function") {
        return result + str + `.${value().rootClass}`;
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

/**
 * CSS variable helper
 */
export function cssVar(name: string, value?: string): string {
  if (value === undefined) {
    return `var(--${name})`;
  }
  return `--${name}: ${value}`;
}

/**
 * CSS keyframes helper
 */
export function keyframes(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  const content = strings
    .reduce((result, str, i) => result + str + (values[i] || ""), "")
    .trim();

  const name = `k${Math.random().toString(36).slice(2, 8)}`;
  return `@keyframes ${name} { ${content} } animation-name: ${name};`;
}
