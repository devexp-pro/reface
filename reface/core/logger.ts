import { load } from "https://deno.land/std/dotenv/mod.ts";
import type { LogLevel, LoggerConfig, Logger } from "./types.ts";

load({ envPath: ".env", export: true });

/**
 * Style constants
 */
const STYLES = {
  // Colors
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bright: "\x1b[1m",

  // Foreground colors
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",

  // Background colors
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
} as const;

/**
 * Level styles with emoji
 */
const LEVEL_STYLES = {
  debug: {
    badge: STYLES.bgBlue + " 🔍 " + STYLES.reset,
    text: STYLES.blue,
  },
  info: {
    badge: STYLES.bgGreen + " ℹ️ " + STYLES.reset,
    text: STYLES.green,
  },
  warn: {
    badge: STYLES.bgYellow + " ⚠️ " + STYLES.reset,
    text: STYLES.yellow,
  },
  error: {
    badge: STYLES.bgRed + " ❌ " + STYLES.reset,
    text: STYLES.red,
  },
} as const;

/**
 * Global logger configuration
 */
const config: LoggerConfig = {
  enabled: Deno.env.get("REFACE_DEBUG") === "true",
  level: (Deno.env.get("REFACE_LOG_LEVEL") || "debug") as LogLevel,
  prefix: "[Reface]",
};

/**
 * Format stack trace
 */
function formatStack(stack: string): string {
  // Получаем текущую директорию запуска
  const cwd = Deno.cwd();
  const cwdPattern = new RegExp(`file:///${cwd}/(.+)`);

  return stack
    .split("\n")
    .slice(1)
    .filter((line) => !line.includes("/core/logger.ts"))
    .map((line) => {
      // Формат с именем функции: "at function (file:line:col)"
      const matchWithFunction = line.match(
        /at\s+(\w+)\s+\((.*?):(\d+):(\d+)\)/
      );
      if (matchWithFunction) {
        const [_, fnName, fullPath, line, col] = matchWithFunction;
        const relativePath = fullPath.match(cwdPattern)?.[1] || fullPath;
        return (
          STYLES.dim +
          "│ " +
          STYLES.reset +
          STYLES.cyan +
          fnName +
          STYLES.reset +
          " at " +
          STYLES.magenta +
          relativePath +
          STYLES.reset +
          STYLES.dim +
          ":" +
          line +
          ":" +
          col +
          STYLES.reset
        );
      }

      // Формат без имени функции: "at file:line:col"
      const matchWithoutFunction = line.match(/at\s+(.*?):(\d+):(\d+)/);
      if (matchWithoutFunction) {
        const [_, fullPath, line, col] = matchWithoutFunction;
        const relativePath = fullPath.match(cwdPattern)?.[1] || fullPath;
        return (
          STYLES.dim +
          "│ " +
          STYLES.reset +
          STYLES.magenta +
          relativePath +
          STYLES.reset +
          STYLES.dim +
          ":" +
          line +
          ":" +
          col +
          STYLES.reset
        );
      }

      return STYLES.dim + "│ " + STYLES.reset + line.trim();
    })
    .join("\n");
}

/**
 * Format data for logging
 */
function formatData(data: unknown, level: LogLevel): string {
  if (!data) return "";
  try {
    const style = LEVEL_STYLES[level].text;

    // Специальная обработка для stack trace
    if (data instanceof Error && data.stack) {
      return "\n" + formatStack(data.stack);
    }

    const json = JSON.stringify(data, null, 2)
      .split("\n")
      .map((line) => STYLES.dim + "│ " + STYLES.reset + line)
      .join("\n");
    return "\n" + json;
  } catch {
    return String(data);
  }
}

/**
 * Format module prefix
 */
function formatPrefix(module: string): string {
  return `${STYLES.bright}🎭 Reface${STYLES.reset}${STYLES.cyan}@${module}${STYLES.reset}:`;
}

/**
 * Create logger for module
 */
export function createLogger(module: string) {
  const prefix = formatPrefix(module);

  return {
    debug(message: string, data?: unknown) {
      if (!config.enabled || config.level !== "debug") return;
      const { badge, text } = LEVEL_STYLES.debug;
      const stack = formatStack(new Error().stack || "");
      console.debug(
        `${badge} ${prefix} ${text}${message}${STYLES.reset}${formatData(
          data,
          "debug"
        )}\n${stack}`
      );
    },

    info(message: string, data?: unknown) {
      if (!config.enabled) return;
      const { badge, text } = LEVEL_STYLES.info;
      console.info(
        `${badge} ${prefix} ${text}${message}${STYLES.reset}${formatData(
          data,
          "info"
        )}`
      );
    },

    warn(message: string, data?: unknown) {
      if (!config.enabled) return;
      const { badge, text } = LEVEL_STYLES.warn;
      console.warn(
        `${badge} ${prefix} ${text}${message}${STYLES.reset}${formatData(
          data,
          "warn"
        )}`
      );
    },

    error(message: string, error?: Error, data?: unknown) {
      if (!config.enabled) return;
      const { badge, text } = LEVEL_STYLES.error;
      console.error(
        `${badge} ${prefix} ${text}${message}${
          error ? `\n${STYLES.red}Error: ${error.message}${STYLES.reset}` : ""
        }${formatData(data, "error")}`
      );
    },
  };
}

/**
 * Configure logger
 */
export function configureLogger(options: Partial<LoggerConfig>) {
  Object.assign(config, options);
}
