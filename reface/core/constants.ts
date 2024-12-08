/**
 * Default log levels
 */
export const LOG_LEVELS = {
  DEBUG: "debug",
  INFO: "info",
  WARN: "warn",
  ERROR: "error",
} as const;

/**
 * Default logger styles
 */
export const LOGGER_STYLES = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
} as const;

/**
 * Error types
 */
export const ERROR_TYPES = {
  RENDER: "RENDER_ERROR",
  COMPONENT: "COMPONENT_ERROR",
  VALIDATION: "VALIDATION_ERROR",
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  INVALID_TEMPLATE: "Invalid template structure",
  COMPONENT_FAILED: "Component failed to render",
  RENDER_FAILED: "Failed to render template",
} as const;
