import type { Template } from "../core/Template.ts";
import type { StyleInterpolation } from "../html/styles.ts";

/**
 * CSS template literal tag
 */
export const css = (
  strings: TemplateStringsArray,
  ...values: StyleInterpolation[]
) => ({
  isStyle: true,
  str: strings,
  args: values,
});

/**
 * CSS variable helper
 */
export const cssVar = (name: string) => `var(--${name})`;

/**
 * CSS keyframes helper
 */
export const keyframes = (
  strings: TemplateStringsArray,
  ...values: StyleInterpolation[]
) => ({
  isStyle: true,
  str: strings,
  args: values,
  isKeyframes: true,
});

// ... other CSS utilities ...
