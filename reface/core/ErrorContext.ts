import type { ErrorDetails, ErrorContext as IErrorContext } from "./types.ts";

class ErrorContextManager {
  private current: IErrorContext = {
    componentStack: [],
    jsxStack: undefined,
    lastError: undefined,
  };

  // Методы для работы со стеком компонентов
  pushComponent(name: string): void {
    this.current.componentStack.push(name);
  }

  popComponent(): void {
    this.current.componentStack.pop();
  }

  // Методы для работы с JSX стеком
  setJSXStack(stack?: string[]): void {
    this.current.jsxStack = stack;
  }

  // Методы для работы с последней ошибкой
  setLastError(error: ErrorDetails): void {
    this.current.lastError = error;
  }

  // Получить текущий контекст
  getContext(): IErrorContext {
    return {
      componentStack: [...this.current.componentStack],
      jsxStack: this.current.jsxStack,
      lastError: this.current.lastError,
    };
  }

  // Сбросить контекст
  reset(): void {
    this.current = {
      componentStack: [],
      jsxStack: undefined,
      lastError: undefined,
    };
  }
}

// Экспортируем единственный экземпляр
export const ErrorContext = new ErrorContextManager();
