// Framework
export { Reface } from "./reface/mod.ts";
export type { RefaceOptions } from "./reface/mod.ts";

// Core
export {
  render,
  type Template,
  type ElementChild,
  type ElementFactory,
  type HTMLAttributes,
  type TemplateGenerator,
} from "./core/mod.ts";

// Elements
export {
  styled,
  css,
  cssVar,
  keyframes,
  // Base elements
  div,
  span,
  p,
  button,
  // Types
  type StyledComponent,
  type StyledFactory,
} from "./elements/mod.ts";

// Layouts
export { clean, twa, type Layout, type LayoutOptions } from "./layouts/mod.ts";

// JSX
export { createElement, Fragment } from "./jsx/mod.ts";

// Component helpers
export function component<T>(
  generate: TemplateGenerator<T>
): TemplateGenerator<T> {
  return generate;
}

/**
 * Response helper
 */
export const RESPONSE = (html?: string | Template, status?: number) => ({
  html: typeof html === "string" ? html : html ? render(html) : undefined,
  status,
});
