import type { ErrorContext } from "./types.ts";

let currentContext: ErrorContext = {
  jsxStack: [],
  componentStack: [],
};

/**
 * Run function with error context
 */
export function withErrorContext<T>(
  fn: () => T,
  context: Partial<ErrorContext>
): T {
  const prevContext = currentContext;
  try {
    currentContext = { ...currentContext, ...context };
    return fn();
  } finally {
    currentContext = prevContext;
  }
}

/**
 * Get current error context
 */
export function getErrorContext(): ErrorContext {
  return { ...currentContext };
}

/**
 * Push component to stack
 */
export function pushComponent(name: string): void {
  currentContext.componentStack = [...currentContext.componentStack, name];
}

/**
 * Pop component from stack
 */
export function popComponent(): void {
  currentContext.componentStack = currentContext.componentStack.slice(0, -1);
}
