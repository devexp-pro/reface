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

export interface Island<R, P> {
  name?: string;
  template: (ctx: {
    rpc: RpcCalls<R>;
    props: P;
    rest: {
      hx: (name: string, method: string, route: string) => string;
    };
  }) => ITemplate;
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
 * Форматированный стек для логирования
 */
export interface FormattedStack {
  componentStack?: string[];
  errorStack?: string[];
  jsxStack?: string[];
}

export interface LoggerStyle {
  badge: string;
  text: string;
}
