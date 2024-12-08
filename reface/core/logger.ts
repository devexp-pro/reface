import { loadSync } from "https://deno.land/std@0.190.0/dotenv/mod.ts";
import { join } from "https://deno.land/std@0.190.0/path/mod.ts";

import type {
  FormattedStack,
  Logger,
  LoggerConfig,
  LoggerStyle,
  LogLevel,
  RenderErrorDetails,
} from "./types.ts";
import { LOG_LEVELS, LOGGER_STYLES } from "./constants.ts";

const LOG_LEVEL_PRIORITIES: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * Контекст ошибок для отслеживания стека компонентов
 */
let currentContext = {
  jsxStack: [] as string[],
  componentStack: [] as string[],
};

const config: LoggerConfig = {
  enabled: true,
  level: LOG_LEVELS.WARN,
};

// Загружаем .env файл если он есть (но не перезаписываем существующие переменные)
loadSync({
  envPath: join(Deno.cwd(), ".env"),
  export: true,
  allowEmptyValues: true,
});

// Инициализируем конфигурацию сразу
try {
  const envLogLevel = Deno.env
    .get("REFACE_LOG_LEVEL")
    ?.toLowerCase() as LogLevel;
  if (envLogLevel && envLogLevel in LOG_LEVEL_PRIORITIES) {
    config.level = envLogLevel;
  }
} catch (error) {
  console.warn("Failed to read REFACE_LOG_LEVEL from env", error);
}

const LEVEL_STYLES: Record<LogLevel, LoggerStyle> = {
  debug: {
    badge: `${LOGGER_STYLES.dim}[D]${LOGGER_STYLES.reset}`,
    text: LOGGER_STYLES.dim,
  },
  info: {
    badge: `${LOGGER_STYLES.blue}[I]${LOGGER_STYLES.reset}`,
    text: LOGGER_STYLES.reset,
  },
  warn: {
    badge: `${LOGGER_STYLES.yellow}[W]${LOGGER_STYLES.reset}`,
    text: LOGGER_STYLES.yellow,
  },
  error: {
    badge: `${LOGGER_STYLES.red}[E]${LOGGER_STYLES.reset}`,
    text: LOGGER_STYLES.red,
  },
};

function shouldLog(messageLevel: LogLevel): boolean {
  if (!config.enabled) return false;
  return (
    LOG_LEVEL_PRIORITIES[messageLevel] >= LOG_LEVEL_PRIORITIES[config.level]
  );
}

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
  context: Partial<typeof currentContext>,
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
  componentStack?: string[],
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
  level: LogLevel,
  message: string,
  style: LoggerStyle,
  data?: unknown,
  error?: Error,
): string {
  const parts = [
    style.badge,
    `[${prefix}]`,
    `${style.text}${message}${LOGGER_STYLES.reset}`,
  ];

  if (error) {
    const stack = formatFullStack(error);
    parts.push(
      `\n${LOGGER_STYLES.red}Error: ${error.message}${LOGGER_STYLES.reset}`,
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

// Создаем базовый логгер для внутреннего использования
function createInternalLogger(): Logger {
  return {
    debug(message: string, data?: unknown) {
      if (shouldLog("debug")) {
        console.debug(
          formatLogMessage(
            "Logger",
            "debug",
            message,
            LEVEL_STYLES.debug,
            data,
          ),
        );
      }
    },
    info(message: string, data?: unknown) {
      if (shouldLog("info")) {
        console.info(
          formatLogMessage("Logger", "info", message, LEVEL_STYLES.info, data),
        );
      }
    },
    warn(message: string, data?: unknown) {
      if (shouldLog("warn")) {
        console.warn(
          formatLogMessage("Logger", "warn", message, LEVEL_STYLES.warn, data),
        );
      }
    },
    error(message: string, error?: Error, data?: unknown) {
      if (shouldLog("error")) {
        console.error(
          formatLogMessage(
            "Logger",
            "error",
            message,
            LEVEL_STYLES.error,
            data,
            error,
          ),
        );
      }
    },
  };
}

const REFACE_VERSION = "0.1.0";
const REFACE_EMOJIS = ["🔄", "⚡️", "🚀", "✨", "💫"];
const getRandomEmoji = () =>
  REFACE_EMOJIS[Math.floor(Math.random() * REFACE_EMOJIS.length)];

const REFACE_STYLES = {
  bg: "\x1b[44m", // синий фон
  bold: "\x1b[1m", // жирный текст
  reset: "\x1b[0m", // сброс стилей
  dim: "\x1b[2m", // серый текст
};

const internalLogger = createInternalLogger();

// Логируем состояние один раз при импорте
console.info(
  `${REFACE_STYLES.bg} ${getRandomEmoji()} ${REFACE_STYLES.bold}Reface${REFACE_STYLES.dim} v${REFACE_VERSION} ${getRandomEmoji()} (${config.level}) ${REFACE_STYLES.reset}`,
);

export function createLogger(prefix: string): Logger {
  return {
    debug(message: string, data?: unknown) {
      if (shouldLog("debug")) {
        console.debug(
          formatLogMessage(prefix, "debug", message, LEVEL_STYLES.debug, data),
        );
      }
    },
    info(message: string, data?: unknown) {
      if (shouldLog("info")) {
        console.info(
          formatLogMessage(prefix, "info", message, LEVEL_STYLES.info, data),
        );
      }
    },
    warn(message: string, data?: unknown) {
      if (shouldLog("warn")) {
        console.warn(
          formatLogMessage(prefix, "warn", message, LEVEL_STYLES.warn, data),
        );
      }
    },
    error(message: string, error?: Error, data?: unknown) {
      if (shouldLog("error")) {
        console.error(
          formatLogMessage(
            prefix,
            "error",
            message,
            LEVEL_STYLES.error,
            data,
            error,
          ),
        );
      }
    },
  };
}

export function configureLogger(options: Partial<LoggerConfig>) {
  const prevLevel = config.level;
  Object.assign(config, options);

  if (prevLevel !== config.level || prevLevel !== options.level) {
    console.info(
      `${REFACE_STYLES.bg} ${getRandomEmoji()} ${REFACE_STYLES.bold}Reface${REFACE_STYLES.dim} log level: ${prevLevel} → ${config.level} ${getRandomEmoji()} ${REFACE_STYLES.reset}`,
    );
  }
}
