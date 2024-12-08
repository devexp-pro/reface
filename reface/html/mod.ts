// Core functionality
export { Template } from "./Template.ts";
export { html } from "./html.ts";
export { render } from "./render.ts";
export { processAttributes, renderAttributes } from "./attributes.ts";
export { escapeAttribute, escapeHTML } from "./escape.ts";
export { combineClassNames, generateClassName } from "./classes.ts";
export { createStylesheet, processCSS } from "./styles.ts";

// Types
export type {
  ElementChild,
  HTMLAttributes,
  ITemplate,
  RenderOptions,
  StyleProcessingOptions,
  TemplateAttributes,
  TemplateFragment,
  TemplateLiteralFunction,
} from "./types.ts";

// Type guards
export { isTemplateFragment } from "./types.ts";

// Utilities
export { StyleCollector } from "./StyleCollector.ts";
export { ScriptCollector } from "./ScriptCollector.ts";

// Constants
export { HTML_ENTITIES, VOID_ELEMENTS } from "./constants.ts";
