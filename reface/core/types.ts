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
  /** Error message */
  message?: string;
  /** Stack trace */
  stack?: string;
}

/**
 * Error context for component rendering
 */
export interface ErrorContext {
  /** Stack of JSX elements */
  jsxStack: string[];
  /** Stack of component names */
  componentStack: string[];
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

export type LogLevel = "debug" | "info" | "warn" | "error";

export type Logger = {
  debug(message: string, ...args: unknown[]): void;
  info(message: string, ...args: unknown[]): void;
  warn(message: string, ...args: unknown[]): void;
  error(
    message: string,
    error?: Error,
    context?: Record<string, unknown>
  ): void;
};

export type ErrorContext = {
  component?: string;
  props?: Record<string, unknown>;
  children?: unknown[];
  stack?: string[];
};

export type ErrorHandler = (error: Error, context: ErrorContext) => void;
