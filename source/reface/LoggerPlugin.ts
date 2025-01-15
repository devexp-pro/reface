import { REFACE_EVENT } from "@reface/constants";
import type { RefaceEventType } from "@reface/types";
import type { IRefaceComposerPlugin } from "@reface/types";
import type { RefaceComposer } from "@recast";
import { blue, dim, green, yellow } from "jsr:@std/fmt@1.0.3/colors";
import { isTemplate } from "@reface/template";

interface RenderLogBase {
  phase: RefaceEventType;
  params: Record<string, unknown>;
  level: number;
}

interface RenderLogStart extends RenderLogBase {
  type: "start";
  end?: RenderLogEnd;
  children: RenderLogStart[];
}

interface RenderLogEnd extends RenderLogBase {
  type: "end";
  start: RenderLogStart;
}

export type RenderLogEntry = RenderLogStart | RenderLogEnd;

export class LoggerPlugin implements IRefaceComposerPlugin {
  readonly name = "logger";
  private rootLogs: RenderLogStart[] = [];
  private activeStack: RenderLogStart[] = [];
  private currentLevel = 0;

  private formatJSON(obj: unknown, seen = new Set(), level = 0): string {
    const indent = "  ".repeat(level);
    const nestedIndent = "  ".repeat(level + 1);

    if (obj === null) return blue("null");
    if (obj === undefined) return dim("undefined");

    // Handle primitive types
    if (typeof obj === "string") return green(`"${obj}"`);
    if (typeof obj === "number") return blue(String(obj));
    if (typeof obj === "boolean") return blue(String(obj));

    // Handle circular references
    if (typeof obj === "object") {
      if (seen.has(obj)) return dim("[Circular]");
      seen.add(obj);
    }

    // Handle template objects
    if (isTemplate(obj)) {
      return this.formatJSON(obj.raw, seen, level);
    }

    // Handle functions
    if (typeof obj === "function") {
      return dim("[Function]");
    }

    // Handle arrays
    if (Array.isArray(obj)) {
      if (obj.length === 0) return "[]";
      const items = obj
        .map((item) =>
          `${nestedIndent}${this.formatJSON(item, seen, level + 1)}`
        )
        .join(",\n");
      return `[\n${items}\n${indent}]`;
    }

    // Handle objects
    if (typeof obj === "object") {
      try {
        const entries = Object.entries(obj as Record<string, unknown>);
        if (entries.length === 0) return "{}";

        const props = entries
          .filter(([_, value]) => value !== undefined)
          .map(([key, value]) => {
            try {
              return `${nestedIndent}${dim('"')}${green(key)}${dim('"')}: ${
                this.formatJSON(value, seen, level + 1)
              }`;
            } catch {
              return `${nestedIndent}${dim('"')}${green(key)}${dim('"')}: ${
                dim("[Unable to format]")
              }`;
            }
          })
          .join(",\n");

        return `{\n${props}\n${indent}}`;
      } catch {
        return dim("[Complex Object]");
      }
    }

    // Handle other types
    return dim(`[${typeof obj}]`);
  }

  private log(
    entry: Omit<RenderLogStart, "level" | "type" | "children">,
    isStart: boolean,
  ): void {
    if (isStart) {
      const logEntry: RenderLogStart = {
        ...entry,
        type: "start",
        level: this.currentLevel++,
        children: [],
      };

      if (this.activeStack.length > 0) {
        this.activeStack[this.activeStack.length - 1].children.push(logEntry);
      } else {
        this.rootLogs.push(logEntry);
      }

      this.activeStack.push(logEntry);
    } else {
      const startEntry = this.activeStack[this.activeStack.length - 1];
      if (startEntry) {
        const endEntry: RenderLogEnd = {
          ...entry,
          type: "end",
          level: startEntry.level,
          start: startEntry,
        };
        startEntry.end = endEntry;
        this.activeStack.pop();
        this.currentLevel = this.activeStack.length;
      }
    }
  }

  private formatPhase(
    phase: string,
    isEnd: boolean,
    params: Record<string, unknown>,
  ): string {
    const parts = phase.split(".");
    const lastPart = parts.pop() || "";
    const prefix = parts.join(".");

    let templateInfo = "";
    if (params.template && isTemplate(params.template)) {
      templateInfo = ` ${yellow(`<${params.template.raw.type}>`)}`;
    }

    return `${dim(prefix + ".")}${
      isEnd ? dim(lastPart) : blue(lastPart)
    }${templateInfo}`;
  }

  private formatParams(params: Record<string, unknown>, level: number): string {
    const indent = this.getIndent(level);
    if (!params || Object.keys(params).length === 0) return "";
    try {
      return `${indent}${this.formatJSON(params, new Set(), level)}`;
    } catch (_error) {
      return `${indent}${dim("[Unable to format params]")}`;
    }
  }

  private getIndent(level: number): string {
    return "  ".repeat(level);
  }

  private formatLog(log: RenderLogStart, result: string[]): void {
    const indent = this.getIndent(log.level);

    // Start event
    result.push(`${indent}${this.formatPhase(log.phase, false, log.params)}`);
    const params = this.formatParams(log.params, log.level);
    if (params) result.push(params);

    // Children
    for (const child of log.children) {
      this.formatLog(child, result);
    }

    // End event
    if (log.end) {
      result.push(
        `${indent}${this.formatPhase(log.end.phase, true, log.end.params)}`,
      );
      const endParams = this.formatParams(log.end.params, log.level);
      if (endParams) result.push(endParams);
    }
  }

  toText(): string {
    const result: string[] = [];
    for (const log of this.rootLogs) {
      this.formatLog(log, result);
    }
    return result.join("\n");
  }

  getLogs(): RenderLogEntry[] {
    return [...this.rootLogs];
  }

  clear(): void {
    this.rootLogs = [];
    this.activeStack = [];
    this.currentLevel = 0;
  }

  setup(reface: RefaceComposer) {
    const manager = reface.getRenderManager();
    const handlePhase =
      (phase: RefaceEventType, isStart: boolean) =>
      ({ manager, ...params }: Record<string, unknown>) => {
        this.log(
          {
            phase,
            params,
          },
          isStart,
        );
      };

    Object.entries(REFACE_EVENT.RENDER).forEach(([_, value]) => {
      manager.on(value.START, handlePhase(value.START, true));
      manager.on(value.END, handlePhase(value.END, false));
    });

    manager.store.set("logger", this);
  }
}
