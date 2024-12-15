// @reface/island/types.ts
import type { Template } from "../core/types.ts";

// Базовый интерфейс для RPC ответа
export interface RpcResponse<S = unknown> {
  // Новое состояние (опционально)
  state?: Partial<S>;
  // HTML для обновления
  html?: Template | string;
  // Статус ответа
  status?: number;
}

// Контекст для RPC обработчика
export interface RpcContext<S> {
  state: S;
  args?: unknown;
}

// Преобразование RPC методов в HTMX атрибуты
export type RpcToHtmx<T> = {
  [K in keyof T]: T[K] extends (args: infer A) => Promise<any>
    ? (args?: A) => string
    : never;
};

// Контекст для шаблона острова
export interface IslandContext<S, P, R> {
  props: P;
  state: S;
  rpc: RpcToHtmx<R>;
}

// Основной интерфейс острова
export interface Island<State = unknown, Props = unknown, RPC = unknown> {
  // Имя острова (опционально)
  name?: string;

  // Шаблон острова
  template: (ctx: IslandContext<State, Props, RPC>) => Template;

  // RPC методы
  rpc?: RPC;

  // Начальное состояние
  initialState?: State;
}
