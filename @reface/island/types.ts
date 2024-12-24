import type { Template, TemplatePayload } from "@reface/template";
import { IslandPlugin } from "./IslandPlugin.ts";

export interface IslandPayload extends TemplatePayload {
  island: {
    name: string;
    state?: unknown;
    rpc?: Record<string, (args: unknown) => Promise<unknown>>;
  };
}

export interface Island<
  State = unknown,
  Props = unknown,
  RPC extends Record<string, RpcMethod<State>> = Record<
    string,
    RpcMethod<State>
  >,
> {
  name?: string;
  template: (context: IslandContext<State, Props, RPC>) => Template;
  initialState?: State;
  rpc?: RPC;
}

// Базовый интерфейс для RPC ответа
export interface RpcResponse<S = unknown> {
  // Новое состояние (опционально)
  state?: Partial<S>;
  // HTML для обновления
  html?: string;
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
  [K in keyof T]: T[K] extends (...args: any[]) => Promise<any>
    ? (args?: Parameters<T[K]>[0]) => Record<string, string>
    : never;
};

// Контекст для шаблона острова
export interface IslandContext<S, P, R> {
  props: P;
  state: S;
  rpc: RpcToHtmx<R>;
}

export type RpcMethod<State> = (
  context: { state: State; args: unknown },
) => Promise<RpcResponse<State>>;

export type RPC<State = unknown> = Record<string, RpcMethod<State>>;

// Основной интерфейс острова
export interface Island<
  State = unknown,
  Props = unknown,
  RPC extends Record<string, RpcMethod<State>> = Record<
    string,
    RpcMethod<State>
  >,
> {
  // Имя острова (опционально)
  name?: string;

  // Шаблон острова
  template: (ctx: IslandContext<State, Props, RPC>) => Template;

  // RPC методы
  rpc?: RPC;

  // Начальное состояние
  initialState?: State;
}

export function createIslandComponent<
  State,
  Props,
  RPC extends Record<string, RpcMethod<State>>,
>(
  island: Island<State, Props, RPC>,
  plugin: IslandPlugin,
) {
  // ...
}
