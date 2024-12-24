import { createTemplateFactory, type Template } from "@reface/template";
import type { IslandPlugin } from "./IslandPlugin.ts";
import type { Island, IslandPayload } from "./types.ts";

const islandTemplate = createTemplateFactory<
  { "data-island": string; id: string },
  IslandPayload
>({
  type: "island",
  process: {
    attributes: ({ template, newAttrs }) => ({
      ...newAttrs,
      "data-island": template.payload.island.name,
      id: `island-${template.payload.island.name}`,
    }),
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
  rpc?: Record<string, (args: unknown) => Promise<unknown>>,
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

export function createIslandComponent<State, Props, RPC>(
  island: Island<State, Props, RPC>,
  plugin: IslandPlugin,
): (props: Props) => Template {
  const name = island.name || `island-${crypto.randomUUID()}`;

  if (island.initialState) {
    plugin.setIslandState(name, island.initialState);
  }

  return (props: Props): Template => {
    const state = plugin.getIslandState<State>(name) || island.initialState;
    const rpc = plugin.createRpcProxy<RPC>(name);

    const context = {
      props,
      state: state as State,
      rpc,
    };

    return createIsland(
      name,
      island.template(context),
      state,
      island.rpc,
    );
  };
}

export const island = {
  create: createIsland,
  createComponent: createIslandComponent,
};
