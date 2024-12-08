import type { RenderErrorDetails, ErrorContext } from "./types.ts";
import { getErrorContext } from "./ErrorContext.ts";

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
    context.componentStack.forEach((component: string, i: number) => {
      lines.push(`  ${" ".repeat(i * 2)}${component}`);
    });
  }

  // JSX stack
  if (context.jsxStack.length) {
    lines.push("\nJSX stack:");
    context.jsxStack.forEach((jsx: string, i: number) => {
      lines.push(`  ${" ".repeat(i * 2)}${jsx}`);
    });
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
