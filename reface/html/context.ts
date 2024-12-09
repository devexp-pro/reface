import { createLogger } from "@reface/core";

const logger = createLogger("HTML:Context");

export interface RenderContext {
  styles: Set<string>; // Уникальные стили
  components: Set<string>; // Использованные компоненты
  depth: number; // Глубина вложенности
  parent?: unknown; // Родительский шаблон
}

export class RenderContextManager {
  private static context: RenderContext;

  static getContext(): RenderContext {
    if (!this.context) {
      this.context = {
        styles: new Set(),
        components: new Set(),
        depth: 0,
      };
    }
    return this.context;
  }

  static createContext(): RenderContext {
    this.context = {
      styles: new Set(),
      components: new Set(),
      depth: 0,
    };
    return this.context;
  }

  static reset(): void {
    this.context = undefined;
    logger.debug("Context reset");
  }
}
