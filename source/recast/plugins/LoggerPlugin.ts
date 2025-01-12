import type { Recast } from "@recast/recast";
import { RecastPlugin } from "@recast/plugin";
import type { Children } from "@recast/expressions";
import { blue, dim, green, yellow } from "jsr:@std/fmt/colors";

interface LogEntry {
  phase: string;
  input: unknown;
  output?: string;
  children: LogEntry[];
}

export class LoggerPlugin extends RecastPlugin {
  readonly name = "logger";
  private logs: LogEntry[] = [];
  private currentEntry?: LogEntry;

  constructor() {
    super();
  }

  private createLogEntry(phase: string, input: unknown): LogEntry {
    return {
      phase,
      input,
      children: [],
    };
  }

  private pushLog(entry: LogEntry): void {
    if (this.currentEntry) {
      this.currentEntry.children.push(entry);
    } else {
      this.logs.push(entry);
    }
  }

  renderBefore(template: Children): void {
    const entry = this.createLogEntry("render", template);
    this.pushLog(entry);
    this.currentEntry = entry;
  }

  renderAfter(_: Children, html: string): void {
    if (this.currentEntry) {
      this.currentEntry.output = html;
      this.currentEntry = undefined;
    }
  }

  renderTemplateBefore(template: Children): void {
    const entry = this.createLogEntry("template", template);
    this.pushLog(entry);
    this.currentEntry = entry;
  }

  renderTemplateAfter(template: Children, html: string): void {
    if (this.currentEntry) {
      this.currentEntry.output = html;
      this.currentEntry = undefined;
    }
  }

  private formatValue(value: unknown): string {
    if (value === null) return blue("null");
    if (value === undefined) return dim("undefined");
    if (typeof value === "string") return green(`"${value}"`);
    if (typeof value === "number") return blue(String(value));
    if (typeof value === "boolean") return blue(String(value));
    if (typeof value === "function") return dim("[Function]");
    if (Array.isArray(value)) {
      return `[${value.map((v) => this.formatValue(v)).join(", ")}]`;
    }
    if (typeof value === "object") return yellow(JSON.stringify(value));
    return dim(`[${typeof value}]`);
  }

  private formatEntry(entry: LogEntry, level = 0): string[] {
    const indent = "  ".repeat(level);
    const lines: string[] = [];

    lines.push(`${indent}${blue(entry.phase)}`);
    lines.push(`${indent}  input: ${this.formatValue(entry.input)}`);

    if (entry.output !== undefined) {
      lines.push(`${indent}  output: ${green(entry.output)}`);
    }

    for (const child of entry.children) {
      lines.push(...this.formatEntry(child, level + 1));
    }

    return lines;
  }

  override toString(): string {
    return this.logs.map((entry) => this.formatEntry(entry).join("\n")).join(
      "\n\n",
    );
  }

  clear(): void {
    this.logs = [];
    this.currentEntry = undefined;
  }
}
