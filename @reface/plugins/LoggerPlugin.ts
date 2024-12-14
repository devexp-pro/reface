import { REFACE_EVENT } from "../core/constants.ts";
import type { IPlugin } from "../Reface.ts";
import type { RefaceEvent } from "../core/types.ts";

export interface RenderLogEntry {
  phase: RefaceEvent;
  input: unknown;
  output?: string;
  timestamp: number;
}

export class LoggerPlugin implements IPlugin {
  readonly name = "logger";
  private logs: RenderLogEntry[] = [];

  log(entry: Omit<RenderLogEntry, "timestamp">): void {
    this.logs.push({
      ...entry,
      timestamp: Date.now(),
    });
  }

  getLogs(): RenderLogEntry[] {
    return [...this.logs];
  }

  clear(): void {
    this.logs = [];
  }

  setup(reface) {
    const manager = reface.getRenderManager();
    const handlePhase =
      (phase: RefaceEvent) => (params: Record<string, unknown>) => {
        const input = params.template || params.child || params.children;
        const output = phase.endsWith(".end") ? params.html : undefined;

        this.log({
          phase,
          input,
          output: output as string | undefined,
        });
      };

    Object.entries(REFACE_EVENT.RENDER).forEach(([_, value]) => {
      manager.on(value.START, handlePhase(value.START));
      manager.on(value.END, handlePhase(value.END));
    });

    manager.store.set("logger", this);
  }
}