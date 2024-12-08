import type { RenderErrorDetails, ErrorContext } from "./types.ts";
import { getErrorContext } from "./ErrorContext.ts";
import { formatErrorStack, formatComponentStack } from "./utils.ts";

/**
 * Format error details for logging
 */
export function formatError(
  error: Error & { details?: RenderErrorDetails }
): string {
  const context: ErrorContext = getErrorContext();
  const lines: string[] = [];

  // Error message
  lines.push(`${error.name}: ${error.message}`);

  // Component stack
  if (context.componentStack.length) {
    lines.push("\nComponent stack:");
    lines.push(formatComponentStack(context.componentStack));
  }

  // Stack trace
  if (error.stack) {
    lines.push("\nStack trace:");
    lines.push(...formatErrorStack(error.stack));
  }

  // Error details
  if (error.details) {
    lines.push("\nDetails:");
    Object.entries(error.details).forEach(([key, value]) => {
      lines.push(`  ${key}: ${JSON.stringify(value)}`);
    });
  }

  return lines.join("\n");
}

/**
 * Log error with context
 */
export function logError(error: Error): void {
  console.error(formatError(error));
}
