// import { type Template, TEMPLATE_COPY } from "@recast/template";
import { element } from "@recast/element";
import type { IslandTemplate, MetaIsland, RpcMethod } from "./types.ts";

export function createIsland<State = unknown>(
  name: string,
  state?: State,
  rpc?: Record<string, RpcMethod<State>>,
): IslandTemplate {
  const meta: MetaIsland = {
    name,
    state,
    rpc,
  };

  return element.div[TEMPLATE_COPY](
    (template) => ({
      ...template,
      node: {
        ...template.node,
        meta: {
          ...template.node.meta,
          island: meta,
        },
      },
      getState<T>(): T {
        return this.node.meta?.island?.state as T;
      },
      setState<T>(state: T): void {
        if (this.node.meta?.island) {
          this.node.meta.island.state = state;
        }
      },
      getRpc<T>(): T {
        return this.node.meta?.island?.rpc as T;
      },
    }),
  ) as IslandTemplate;
}

export function createIslandComponent<State = unknown>(
  name: string,
  content: Template,
  state?: State,
  rpc?: Record<string, RpcMethod<State>>,
): IslandTemplate {
  const island = createIsland(name, state, rpc);

  return island[TEMPLATE_COPY](
    (template) => ({
      ...template,
      node: {
        ...template.node,
        children: [content],
      },
    }),
  ) as IslandTemplate;
}
