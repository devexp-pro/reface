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

export interface RpcResponse<S = unknown> {
  state?: Partial<S>;

  html?: string;

  status?: number;
}

export interface RpcContext<S> {
  state: S;
  args?: unknown;
}

export type RpcToHtmx<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => Promise<any>
    ? (args?: Parameters<T[K]>[0]) => Record<string, string>
    : never;
};

export interface IslandContext<S, P, R> {
  props: P;
  state: S;
  rpc: RpcToHtmx<R>;
}

export type RpcMethod<State> = (
  context: { state: State; args: unknown },
) => Promise<RpcResponse<State>>;

export type RPC<State = unknown> = Record<string, RpcMethod<State>>;

export interface Island<
  State = unknown,
  Props = unknown,
  RPC extends Record<string, RpcMethod<State>> = Record<
    string,
    RpcMethod<State>
  >,
> {
  name?: string;

  template: (ctx: IslandContext<State, Props, RPC>) => Template;

  rpc?: RPC;

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
