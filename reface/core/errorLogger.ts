import type { ErrorContext } from "./types.ts";

// Брендинг
const brand = {
  name: "Reface",
  emoji: "��",
  version: "0.2.0", // TODO: get version from package.json
};

// Цвета для консоли
const colors = {
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
  white: "\x1b[37m",
  bold: "\x1b[1m",
  reset: "\x1b[0m",
};

// Символы для оформления
const symbols = {
  arrow: "→",
  bullet: "•",
  line: "│",
  corner: "└",
  branch: "├",
  error: "✖",
  warning: "⚠",
  info: "ℹ",
};

// Форматирование для консоли
const format = {
  error: (text: string) => `${colors.red}${colors.bold}${text}${colors.reset}`,
  warning: (text: string) => `${colors.yellow}${text}${colors.reset}`,
  info: (text: string) => `${colors.blue}${text}${colors.reset}`,
  component: (text: string) => `${colors.cyan}${text}${colors.reset}`,
  code: (text: string) => `${colors.magenta}${text}${colors.reset}`,
  dim: (text: string) => `${colors.gray}${text}${colors.reset}`,
  brand: (text: string) => `${colors.cyan}${colors.bold}${text}${colors.reset}`,
  tree: (text: string, last = false) =>
    format.dim(`${last ? symbols.corner : symbols.branch} ${text}`),
  line: (text: string) => format.dim(`${symbols.line} ${text}`),
};

// Класс логгера
export class ErrorLogger {
  private lines: string[] = [];

  constructor(private message: string, private context?: ErrorContext) {}

  private addHeader() {
    this.lines.push(
      format.brand(`${brand.emoji} ${brand.name} `) +
        format.dim(`v${brand.version}`) +
        "\n"
    );
  }

  private addErrorMessage() {
    this.lines.push(
      format.error(`${symbols.error} Error: `) + format.dim(this.message) + "\n"
    );
  }

  private addErrorDetails() {
    if (!this.context?.lastError) return;

    this.lines.push(format.info(`${symbols.info} Error details:`));
    this.lines.push(
      format.tree(
        `Component: ${format.component(
          `<${this.context.lastError.component}>`
        )}`,
        !this.context.lastError.props && !this.context.lastError.template
      )
    );

    if (this.context.lastError.props) {
      this.lines.push(format.tree("Props:", !this.context.lastError.template));
      const props = JSON.stringify(this.context.lastError.props, null, 2)
        .split("\n")
        .map((line) => format.line(line));
      this.lines.push(...props);
    }

    if (this.context.lastError.template !== undefined) {
      this.lines.push(format.tree("Received:", true));
      if (
        typeof this.context.lastError.template === "object" &&
        this.context.lastError.template !== null &&
        "type" in this.context.lastError.template &&
        this.context.lastError.template.type === "function" &&
        "source" in this.context.lastError.template
      ) {
        const source = String(this.context.lastError.template.source)
          .split("\n")
          .map((line) => format.line(format.code(line)));
        this.lines.push(...source);
      } else {
        const template = JSON.stringify(
          this.context.lastError.template,
          null,
          2
        )
          .split("\n")
          .map((line) => format.line(line));
        this.lines.push(...template);
      }
    }
  }

  private addStacks() {
    if (this.context?.jsxStack?.length) {
      this.lines.push("\n" + format.info(`${symbols.info} JSX Stack:`));
      this.context.jsxStack.forEach((frame, i, arr) => {
        this.lines.push(
          format.tree(
            format.dim("at ") + format.component(frame),
            i === arr.length - 1
          )
        );
      });
    }

    if (this.context?.componentStack?.length) {
      this.lines.push("\n" + format.info(`${symbols.info} Render Stack:`));
      this.context.componentStack.forEach((comp, i, arr) => {
        this.lines.push(
          format.tree(
            format.dim("at ") + format.component(comp),
            i === arr.length - 1
          )
        );
      });
    }
  }

  format(): string {
    this.addHeader();
    this.addErrorMessage();
    this.addErrorDetails();
    this.addStacks();
    return this.lines.join("\n") + "\n";
  }
}

// Функция для форматирования ошибок
export function formatError(message: string, context?: ErrorContext): string {
  return new ErrorLogger(message, context).format();
}
