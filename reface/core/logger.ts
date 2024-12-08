import { load } from "https://deno.land/std@0.190.0/dotenv/mod.ts";
import type {
  LoggerConfig,
  Logger,
  LoggerStyle,
  FormattedStack,
  RenderErrorDetails,
} from "./types.ts";
import { LOG_LEVELS, LOGGER_STYLES } from "./constants.ts";

load({ envPath: ".env", export: true });

/**
 * Контекст ошибок для отслеживания стека компонентов
 */
let currentContext = {
  jsxStack: [] as string[],
  componentStack: [] as string[],
};

const config: LoggerConfig = {
  enabled: true,
  level: LOG_LEVELS.INFO,
};

const LEVEL_STYLES: Record<string, LoggerStyle> = {
  [LOG_LEVELS.DEBUG]: {
    badge: `${LOGGER_STYLES.dim}●${LOGGER_STYLES.reset}`,
    text: LOGGER_STYLES.dim,
  },
  [LOG_LEVELS.INFO]: {
    badge: `${LOGGER_STYLES.blue}●${LOGGER_STYLES.reset}`,
    text: LOGGER_STYLES.reset,
  },
  [LOG_LEVELS.WARN]: {
    badge: `${LOGGER_STYLES.yellow}●${LOGGER_STYLES.reset}`,
    text: LOGGER_STYLES.yellow,
  },
  [LOG_LEVELS.ERROR]: {
    badge: `${LOGGER_STYLES.red}●${LOGGER_STYLES.reset}`,
    text: LOGGER_STYLES.red,
  },
};

/**
 * Получить текущий контекст ошибки
 */
export function getErrorContext() {
  return { ...currentContext };
}

/**
 * Выполнить функцию с контекстом ошибки
 */
export function withErrorContext<T>(
  fn: () => T,
  context: Partial<typeof currentContext>
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
 * Добавить компонент в стек
 */
export function pushComponent(name: string): void {
  currentContext.componentStack = [...currentContext.componentStack, name];
}

/**
 * Удалить компонент из стека
 */
export function popComponent(): void {
  currentContext.componentStack = currentContext.componentStack.slice(0, -1);
}

/**
 * Форматирует стек ошибки
 */
function formatErrorStack(stack: string): string[] {
  return stack
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/**
 * Форматирует полный стек
 */
function formatFullStack(
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
 * Форматирует данные для логирования
 */
function formatData(data: unknown, compact = false): string {
  if (!data) return "";
  return compact ? JSON.stringify(data) : `\n${JSON.stringify(data, null, 2)}`;
}

/**
 * Форматирует ошибку для логирования
 */
function formatError(error: Error & { details?: RenderErrorDetails }): string {
  const context = getErrorContext();
  const stack: FormattedStack = formatFullStack(error, context.componentStack);
  const lines: string[] = [];

  // Основное сообщение
  lines.push(`${error.name}: ${error.message}`);

  // Стек компонентов
  if (stack.componentStack?.length) {
    lines.push("\nComponent stack:");
    lines.push(...stack.componentStack);
  }

  // Стек ошибки
  if (stack.errorStack?.length) {
    lines.push("\nStack trace:");
    lines.push(...stack.errorStack);
  }

  // Детали ошибки
  if (error.details) {
    lines.push("\nDetails:");
    lines.push(formatData(error.details));
  }

  return lines.join("\n");
}

function formatLogMessage(
  prefix: string,
  message: string,
  style: LoggerStyle,
  data?: unknown,
  error?: Error
): string {
  const parts = [
    style.badge,
    prefix,
    `${style.text}${message}${LOGGER_STYLES.reset}`,
  ];

  if (error) {
    const stack = formatFullStack(error);
    parts.push(
      `\n${LOGGER_STYLES.red}Error: ${error.message}${LOGGER_STYLES.reset}`
    );
    if (stack.errorStack?.length) {
      parts.push("\nStack trace:");
      parts.push(stack.errorStack.join("\n"));
    }
  }

  if (data) {
    parts.push(formatData(data));
  }

  return parts.join(" ");
}

export function createLogger(prefix: string): Logger {
  return {
    debug(message: string, data?: unknown) {
      if (!config.enabled || config.level !== LOG_LEVELS.DEBUG) return;
      console.debug(
        formatLogMessage(prefix, message, LEVEL_STYLES[LOG_LEVELS.DEBUG], data)
      );
    },

    info(message: string, data?: unknown) {
      if (!config.enabled) return;
      console.info(
        formatLogMessage(prefix, message, LEVEL_STYLES[LOG_LEVELS.INFO], data)
      );
    },

    warn(message: string, data?: unknown) {
      if (!config.enabled) return;
      console.warn(
        formatLogMessage(prefix, message, LEVEL_STYLES[LOG_LEVELS.WARN], data)
      );
    },

    error(message: string, error?: Error, data?: unknown) {
      if (!config.enabled) return;
      console.error(
        formatLogMessage(
          prefix,
          message,
          LEVEL_STYLES[LOG_LEVELS.ERROR],
          data,
          error
        )
      );
    },
  };
}

export function configureLogger(options: Partial<LoggerConfig>) {
  Object.assign(config, options);
}
