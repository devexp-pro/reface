/**
 * Error details for template rendering
 */
export interface RenderErrorDetails {
  /** Component name or description */
  component?: string;
  /** Props that caused the error */
  props?: Record<string, unknown>;
  /** Template that caused the error */
  template?: unknown;
  /** Additional error message */
  message?: string;
  /** Error stack trace */
  stack?: string;
}

/**
 * Component error details
 */
export interface ComponentErrorDetails {
  component: string;
  props?: Record<string, unknown>;
}

/**
 * RPC and Island related types
 */
export interface RpcDefinition {
  [key: string]: (args?: any) => Promise<any>;
}

export interface RpcCalls<T> {
  hx: {
    [K in keyof T]?: (args?: any) => string;
  };
}

export interface RpcHandlers<T> {
  [key: string]: (args?: any) => Promise<T>;
}

export interface RestHandlers {
  [key: string]: (req: Request) => Promise<Response>;
}

import type { Template } from "../html/types.ts";

export interface Island<R, P> {
  name?: string;
  template: (ctx: {
    rpc: RpcCalls<R>;
    props: P;
    rest: {
      hx: (name: string, method: string, route: string) => string;
    };
  }) => Template;
  rest?: RestHandlers;
  rpc?: RpcHandlers<R>;
}

/**
 * Debug levels for logging
 */
export type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * Logger configuration
 */
export interface LoggerConfig {
  enabled: boolean;
  level: LogLevel;
  prefix?: string;
}

/**
 * Logger interface
 */
export interface Logger {
  debug(message: string, data?: unknown): void;
  info(message: string, data?: unknown): void;
  warn(message: string, data?: unknown): void;
  error(message: string, error?: Error, data?: unknown): void;
}

/**
 * Error context for component stack
 */
export interface ErrorContext {
  /** Stack of JSX elements */
  jsxStack: string[];
  /** Stack of component names */
  componentStack: string[];
}

/**
 * Error context options
 */
export interface ErrorContextOptions {
  jsxStack?: string[];
  componentStack?: string[];
}

/**
 * Error handler function type
 */
export type ErrorHandler = (error: Error, context: ErrorContext) => void;
