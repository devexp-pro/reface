import type { Template } from "./template.ts";

export interface IRenderContext {
  depth: number;
  styles: Set<string>;
  components: Set<string>;
  islands: Map<string, () => Promise<unknown>>;
}

export class RenderContextManager {
  private static context?: IRenderContext;

  static getContext(): IRenderContext {
    if (!this.context) {
      this.context = {
        depth: 0,
        styles: new Set(),
        components: new Set(),
        islands: new Map(),
      };
    }
    return this.context;
  }

  static createContext(): IRenderContext {
    this.context = {
      depth: 0,
      styles: new Set(),
      components: new Set(),
      islands: new Map(),
    };
    return this.context;
  }

  static reset(): void {
    this.context = undefined;
  }
}
