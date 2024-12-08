// Core types
export type {
  Template,
  TemplateFragment,
  TemplateAttributes,
  HTMLAttributes,
  ElementChild,
  TemplateLiteralFunction,
  ComponentFunction,
  SimpleComponentFunction,
  StyledComponentFunction,
} from "./types.ts";

// Template functions
export { html } from "./html.ts";
export { render } from "./render.ts";

// Attribute processing
export { processAttributes, renderAttributes } from "./attributes.ts";

// HTML escaping
export { escapeHTML, escapeAttribute } from "./escape.ts";

// Class name utilities
export { generateClassName, combineClassNames } from "./classes.ts";

// Style processing
export { processStyles, createStylesheet, processCSS } from "./styles.ts";

// Type guards and utilities
export { isVoidElement, isSelfClosing } from "./utils.ts";

export { isTemplateFragment } from "./types.ts";

// Style types
export type { StyleInterpolation, StyleProcessingOptions } from "./types.ts";

export { StyleCollector } from "./StyleCollector.ts";

// Constants
export { VOID_ELEMENTS, SELF_CLOSING_ELEMENTS } from "./constants.ts";
