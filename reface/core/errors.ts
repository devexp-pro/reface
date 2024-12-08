import type { RenderErrorDetails } from "./types.ts";

/**
 * Base error class for Reface
 */
export class RefaceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RefaceError";
  }
}

/**
 * Error thrown during template rendering
 */
export class RenderError extends RefaceError {
  constructor(message: string, public details: RenderErrorDetails) {
    super(message);
    this.name = "RenderError";
  }
}

/**
 * Error thrown during component initialization
 */
export class ComponentError extends RefaceError {
  constructor(
    message: string,
    public component: string,
    public props?: Record<string, unknown>
  ) {
    super(message);
    this.name = "ComponentError";
  }
}

/**
 * Error thrown during template validation
 */
export class ValidationError extends RefaceError {
  constructor(message: string, public template: unknown) {
    super(message);
    this.name = "ValidationError";
  }
}
