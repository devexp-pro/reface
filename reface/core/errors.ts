import type { RenderErrorDetails, ComponentErrorDetails } from "./types.ts";

/**
 * Базовый класс ошибок Reface
 */
export class RefaceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RefaceError";
  }
}

/**
 * Ошибка рендеринга шаблона
 */
export class RenderError extends RefaceError {
  constructor(message: string, public details: RenderErrorDetails) {
    super(message);
    this.name = "RenderError";
  }
}

/**
 * Ошибка инициализации компонента
 */
export class ComponentError extends RefaceError {
  constructor(message: string, details: ComponentErrorDetails) {
    super(message);
    this.name = "ComponentError";
    this.component = details.component;
    this.props = details.props;
  }

  readonly component: string;
  readonly props?: Record<string, unknown>;
}

/**
 * Ошибка валидации шаблона
 */
export class ValidationError extends RefaceError {
  constructor(message: string, public template: unknown) {
    super(message);
    this.name = "ValidationError";
  }
}
