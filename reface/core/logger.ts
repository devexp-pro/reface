import { load } from "https://deno.land/std@0.190.0/dotenv/mod.ts";
import type { LoggerConfig, Logger } from "./types.ts";
import { LOG_LEVELS, LOGGER_STYLES } from "./constants.ts";
import { formatComponentStack, formatData } from "./utils.ts";

load({ envPath: ".env", export: true });

const config: LoggerConfig = {
  enabled: true,
  level: LOG_LEVELS.INFO,
};

const LEVEL_STYLES = {
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

export function createLogger(prefix: string): Logger {
  return {
    debug(message: string, data?: unknown) {
      if (!config.enabled || config.level !== LOG_LEVELS.DEBUG) return;
      const { badge, text } = LEVEL_STYLES[LOG_LEVELS.DEBUG];
      const stack = formatComponentStack(new Error().stack || "");
      console.debug(
        `${badge} ${prefix} ${text}${message}${LOGGER_STYLES.reset}${formatData(
          data,
          LOG_LEVELS.DEBUG
        )}\n${stack}`
      );
    },

    info(message: string, data?: unknown) {
      if (!config.enabled) return;
      const { badge, text } = LEVEL_STYLES[LOG_LEVELS.INFO];
      console.info(
        `${badge} ${prefix} ${text}${message}${LOGGER_STYLES.reset}${formatData(
          data,
          LOG_LEVELS.INFO
        )}`
      );
    },

    warn(message: string, data?: unknown) {
      if (!config.enabled) return;
      const { badge, text } = LEVEL_STYLES[LOG_LEVELS.WARN];
      console.warn(
        `${badge} ${prefix} ${text}${message}${LOGGER_STYLES.reset}${formatData(
          data,
          LOG_LEVELS.WARN
        )}`
      );
    },

    error(message: string, error?: Error, data?: unknown) {
      if (!config.enabled) return;
      const { badge, text } = LEVEL_STYLES[LOG_LEVELS.ERROR];
      console.error(
        `${badge} ${prefix} ${text}${message}${
          error
            ? `\n${LOGGER_STYLES.red}Error: ${error.message}${LOGGER_STYLES.reset}`
            : ""
        }${formatData(data, LOG_LEVELS.ERROR)}`
      );
    },
  };
}

export function configureLogger(options: Partial<LoggerConfig>) {
  Object.assign(config, options);
}
