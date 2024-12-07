import type { ErrorContext as IErrorContext } from "./types.ts";
import { ErrorContext } from "./ErrorContext.ts";
import { formatError } from "./errorLogger.ts";
import type { Template } from "./types.ts";
import type { TemplateFragment } from "../html/types.ts";

// Базовый класс для ошибок Reface
export class RefaceError extends Error {
  constructor(message: string, public context?: IErrorContext) {
    super(formatError(message, context));
    this.name = this.constructor.name;
  }
}

// Ошибка рендеринга
export class RenderError extends RefaceError {
  constructor(
    message: string,
    public template?: Template | TemplateFragment,
    context?: IErrorContext
  ) {
    super(message, context);
    this.name = "RenderError";
  }
}

// Ошибка JSX
export class JSXError extends RefaceError {
  constructor(
    message: string,
    componentName: string,
    props?: Record<string, unknown>,
    children?: unknown[]
  ) {
    super(message, {
      componentStack: [],
      lastError: {
        component: componentName,
        template: undefined,
        props,
      },
    });
    this.name = "JSXError";
  }
}

// Утилита для выполнения кода с отслеживанием стека
export function withErrorTracking<T>(
  componentName: string,
  fn: () => T,
  props?: Record<string, unknown>
): T {
  ErrorContext.pushComponent(componentName);
  try {
    return fn();
  } catch (err) {
    if (err instanceof RefaceError) {
      throw err;
    }
    ErrorContext.setLastError({
      component: componentName,
      template: undefined,
      props,
    });
    throw new RefaceError(
      `Error in ${componentName}: ${
        err instanceof Error ? err.message : String(err)
      }`,
      ErrorContext.getContext()
    );
  } finally {
    ErrorContext.popComponent();
  }
}

export { ErrorContext };
