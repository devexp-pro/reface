// Core types and interfaces
export type {
  Template,
  ElementChild,
  HTMLAttributes,
  TemplateFragment,
} from "./types.ts";

// Core functionality
export { html } from "./html.ts";
export { render } from "./render.ts";
export { processAttributes } from "./attributes.ts";
export { escapeHTML } from "./escape.ts";

// Utilities
export { generateClassName } from "./classes.ts";
export { processCSS } from "./styles.ts";
export { isTemplateFragment } from "./types.ts";
