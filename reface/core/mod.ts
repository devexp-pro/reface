import type { Template } from "@reface/html";
import { render } from "@reface/html";

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

export { createLogger, configureLogger } from "./logger.ts";
export type { LogLevel, LoggerConfig } from "./logger.ts";
