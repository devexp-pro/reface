import type { Template } from "./types.ts";
import { render } from "./render.ts";

export type {
  Template,
  TemplateFragment,
  HTMLAttributes,
  ElementChild,
} from "./types.ts";
export { isTemplateFragment } from "./types.ts";
export { escapeHTML, escapeAttribute } from "./escape.ts";
export { attributes } from "./attributes.ts";
export { render } from "./render.ts";

/**
 * Response helper for RPC calls
 */
export const RESPONSE = (html?: string | Template, status?: number) => ({
  html: typeof html === "string" ? html : html ? render(html) : undefined,
  status,
});

// Error types and utilities
export type { RenderErrorDetails, ErrorContext } from "./types.ts";
export {
  RefaceError,
  RenderError,
  ComponentError,
  ValidationError,
} from "./errors.ts";
export {
  withErrorContext,
  getErrorContext,
  pushComponent,
  popComponent,
} from "./ErrorContext.ts";
export { formatError, logError } from "./errorLogger.ts";

// RPC types
export type {
  RpcDefinition,
  RpcCalls,
  RpcHandlers,
  RestHandlers,
} from "./types.ts";
export type { Island } from "./types.ts";
