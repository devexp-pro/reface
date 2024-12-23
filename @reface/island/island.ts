import {
  createTemplateFactory,
  type Template,
  type TemplatePayload,
} from "@reface/template";
import type { IslandPlugin } from "./IslandPlugin.ts";

interface IslandPayload extends TemplatePayload {
  island: {
    name: string;
    state?: unknown;
    rpc?: Record<string, (args: unknown) => Promise<unknown>>;
  };
}

interface IslandContext<State, Props, RPC> {
  props: Props;
  state: State;
  rpc: RPC;
}

export interface Island<State = unknown, Props = unknown, RPC = unknown> {
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

const islandTemplate = createTemplateFactory<
  { "data-island": string; id: string },
  IslandPayload
>({
  type: "island",
  create: {
    defaults: {
      tag: "div",
      attributes: {},
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
