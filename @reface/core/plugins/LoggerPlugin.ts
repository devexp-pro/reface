import type { IRenderManager, RenderPhase } from "../render/types.ts";

export interface RenderLogEntry {
  phase: RenderPhase;
  input: unknown;
  output?: string;
  timestamp: number;
}

export class LoggerPlugin {
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

  install(manager: IRenderManager) {
    const handlePhase =
      (phase: RenderPhase) => (params: Record<string, unknown>) => {
        const input = params.template || params.child || params.children;
        const output = phase.endsWith(":end") ? params.html : undefined;

        this.log({ phase, input, output });
      };

    ["render", "renderTemplate", "renderChild", "renderChildren"].forEach(
      (phase) => {
        manager.on(
          `${phase}:start` as RenderPhase,
          handlePhase(`${phase}:start` as RenderPhase),
        );
        manager.on(
          `${phase}:end` as RenderPhase,
          handlePhase(`${phase}:end` as RenderPhase),
        );
      },
    );

    manager.store.set("logger", this);
  }
}
