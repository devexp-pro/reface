// Core functionality
export { TemplateBase } from "./TemplateBase.ts";
export { Template } from "./Template.ts";
export { TemplateFragment } from "./TemplateFragment.ts";
export { TemplateText } from "./TemplateText.ts";
export { TemplateHtml } from "./TemplateHtml.ts";
export { TemplateComponent } from "./TemplateComponent.ts";
export { html } from "./html.ts";
export { render } from "./render.ts";
export { renderAttributes } from "./attributes.ts";
export { escapeAttribute, escapeHTML } from "./escape.ts";
export { combineClassNames, generateClassName } from "./classes.ts";
export { createStylesheet, processCSS } from "./styles.ts";

// Types
export type {
  ElementChildType,
  IHTMLAttributes as HTMLAttributes,
  IStyleProcessingOptions as StyleProcessingOptions,
  ITemplate,
  ITemplateFragment as TemplateFragment,
  ITemplateLiteralFunction as TemplateLiteralFunction,
  RenderOptionsType as RenderOptions,
} from "./types.ts";
export * from "./types.ts";

// Type guards
export { isTemplateFragment } from "./types.ts";

// Utilities
export { StyleCollector } from "./StyleCollector.ts";
export { ScriptCollector } from "./ScriptCollector.ts";

// Constants
export { HTML_ENTITIES, VOID_ELEMENTS } from "./constants.ts";

export { type IRenderContext } from "./context.ts";
