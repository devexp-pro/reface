export interface IRenderContext {
  styles: Set<string>;
  components: Set<string>;
  depth: number;
  parent?: unknown;
}

export class RenderContextManager {
  private static context?: IRenderContext;

  static getContext(): IRenderContext {
    if (!this.context) {
      this.context = {
        styles: new Set(),
        components: new Set(),
        depth: 0,
      };
    }
    return this.context;
  }

  static createContext(): IRenderContext {
    this.context = {
      styles: new Set(),
      components: new Set(),
      depth: 0,
    };
    return this.context;
  }

  static reset(): void {
    this.context = undefined;
  }
}
