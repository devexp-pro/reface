export interface MetaIsland {
  name: string;
  state?: unknown;
  rpc?: Record<string, RpcMethod>;
}

export interface IslandPayload extends TemplatePayload {
  island: MetaIsland;
}

export type RpcMethod<State = unknown> = (
  context: RpcContext<State>,
) => Promise<RpcResponse>;

export interface RpcContext<State> {
  state: State;
  args?: unknown;
}

export interface RpcResponse<State = unknown> {
  state?: Partial<State>;
  html?: string;
  status?: number;
}

export type RpcToHtmx<T> = {
  [K in keyof T]: (args?: unknown) => Record<string, string>;
};

export interface IslandTemplate extends Template {
  getState<T>(): T;
  setState<T>(state: T): void;
  getRpc<T>(): RpcToHtmx<T>;
}
