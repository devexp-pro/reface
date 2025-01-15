import {
  createTemplateFactory,
  type Template,
  type TemplateAttributes,
} from "@reface/template";
import type { IslandPlugin } from "./IslandPlugin.ts";
import type { Island, IslandPayload, RpcMethod, RpcResponse } from "./types.ts";

const islandTemplate = createTemplateFactory<
  TemplateAttributes,
  IslandPayload
>({
  type: "island",
  process: {
    attributes: ({ template, newAttrs }) => {
      if (!template) {
        return newAttrs;
      }

      return {
        ...newAttrs,
        "data-island": template.payload.island.name,
        id: `island-${template.payload.island.name}`,
      };
    },
  },
  create: {
    defaults: {
      tag: "div",
    },
  },
});

export function createIsland(
  name: string,
  content: Template,
  state?: unknown,
  rpc?: Record<string, (args: unknown) => Promise<RpcResponse<unknown>>>,
) {
  return islandTemplate({
    tag: "div",
    attributes: {
      "data-island": name,
      id: `island-${name}`,
    },
    children: [content],
    payload: {
      island: {
        name,
        state,
        rpc,
      },
    },
  });
}

export function createIslandComponent<
  State,
  Props,
  RPC extends Record<string, RpcMethod<State>>,
>(
  island: Island<State, Props, RPC>,
  plugin: IslandPlugin,
): (props: Props) => Template<TemplateAttributes, IslandPayload> {
  const name = island.name || `island-${crypto.randomUUID()}`;

  if (island.initialState) {
    plugin.setIslandState(name, island.initialState);
  }

  return (props: Props): Template<TemplateAttributes, IslandPayload> => {
    const state = plugin.getIslandState<State>(name) || island.initialState;
    const rpc = plugin.createRpcProxy<RPC>(name);

    const context = {
      props,
      state: state as State,
      rpc,
    };

    const content = island.template(context);

    return createIsland(
      name,
      content,
      state,
      island.rpc as Record<
        string,
        (args: unknown) => Promise<RpcResponse<unknown>>
      >,
    );
  };
}

export const island = {
  create: createIsland,
  createComponent: createIslandComponent,
};
