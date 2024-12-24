import type { Template, TemplatePayload } from "@reface/template";

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
  RPC extends Record<string, RpcMethod> = Record<string, RpcMethod>,
> {
  name?: string;
  template: (context: IslandContext<State, Props, RPC>) => Template;
  initialState?: State;
  rpc?: Record<
    string,
    (args: { state: State; args: unknown }) => Promise<{
      state?: Partial<State>;
      html?: string;
      status?: number;
    }>
  >;
}

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

export type RpcMethod<T = unknown> = (
  context: RpcContext<T>,
) => Promise<RpcResponse>;

export type RPC = Record<string, RpcMethod>;

// Основной интерфейс острова
export interface Island<
  State = unknown,
  Props = unknown,
  RPC extends Record<string, RpcMethod> = Record<string, RpcMethod>,
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
