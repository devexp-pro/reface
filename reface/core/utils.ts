import type { FormattedStack } from "./types.ts";

/**
 * Format error stack for logging
 */
export function formatErrorStack(stack: string): string[] {
  return stack
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Format component stack for logging
 */
export function formatComponentStack(stack: string[] | string): string[] {
  if (Array.isArray(stack)) {
    return stack;
  }
  return formatErrorStack(stack);
}

/**
 * Format full stack
 */
export function formatFullStack(
  error: Error,
  componentStack?: string[]
): FormattedStack {
  const result: FormattedStack = {};

  if (componentStack?.length) {
    result.componentStack = componentStack;
  }

  if (error.stack) {
    result.errorStack = formatErrorStack(error.stack);
  }

  return result;
}

/**
 * Format data for logging
 */
export function formatData(data: unknown, compact = false): string {
  if (!data) return "";
  return compact ? JSON.stringify(data) : `\n${JSON.stringify(data, null, 2)}`;
}
