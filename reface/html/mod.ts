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
export { html, template } from "./templates.ts";
export { render } from "./render.ts";

// Attribute processing
export { processAttributes, renderAttributes } from "./attributes.ts";

// HTML escaping
export { escapeHTML, escapeAttribute } from "./escape.ts";

// Class name utilities
export { generateClassName, combineClassNames } from "./classes.ts";

// Style processing
export { processStyles, createStylesheet } from "./styles.ts";

// Type guards and utilities
export { isVoidElement, isSelfClosing } from "./utils.ts";
