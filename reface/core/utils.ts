import { ERROR_TYPES } from "./constants.ts";

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
export function formatComponentStack(stack: string): string {
  return stack
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n");
}

/**
 * Get error type name
 */
export function getErrorTypeName(type: keyof typeof ERROR_TYPES): string {
  return ERROR_TYPES[type];
}

/**
 * Format data for logging
 */
export function formatData(data: unknown, level: string): string {
  if (!data) return "";
  return `\n${JSON.stringify(data, null, 2)}`;
}
