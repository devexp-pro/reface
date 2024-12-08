import type { CSSResult, StyleInterpolation } from "./types.ts";

/**
 * CSS template literal tag
 */
export function css(
  strings: TemplateStringsArray,
  ...values: StyleInterpolation[]
): CSSResult {
  return {
    isStyle: true,
    str: strings,
    args: values,
  };
}

/**
 * CSS variable helper
 */
export function cssVar(name: string): string {
  return `var(--${name})`;
}

/**
 * CSS keyframes helper
 */
export function keyframes(
  strings: TemplateStringsArray,
  ...values: StyleInterpolation[]
): CSSResult {
  return {
    isStyle: true,
    str: strings,
    args: values,
    isKeyframes: true,
  };
}

// ... other CSS utilities ...
