import { componentExpression } from "@recast/expressions";
import type { ComponentNode } from "@recast";
import type { IslandPlugin } from "./IslandPlugin.ts";
import type { Island, IslandPayload, RpcMethod, RpcResponse } from "./types.ts";

export function island<
  State = void,
  Props = void,
  RPC extends Record<string, RpcMethod<State>> = Record<string, never>,
>(
  config: Island<State, Props, RPC>,
  plugin: IslandPlugin,
): ComponentNode<Props> {
  const name = config.name || `island-${crypto.randomUUID()}`;

  // Initialize state if provided
  if (config.initialState) {
    plugin.setIslandState(name, config.initialState);
  }

  return componentExpression.create({
    name,
    render: (props: Props) => {
      // Get current state or use initial
      const state = plugin.getIslandState<State>(name) || config.initialState;

      // Create RPC proxy for methods
      const rpc = plugin.createRpcProxy<RPC>(name);

      // Create template context
      const context = {
        props,
        state: state as State,
        rpc,
      };

      // Render template with context
      const content = config.template(context);

      return componentExpression.create({
        name: `${name}-container`,
        render: () => ({
          tag: "div",
          attributes: {
            "data-island": name,
            id: `island-${name}`,
          },
          children: [content],
          meta: {
            island: {
              name,
              state,
              rpc: config.rpc as Record<
                string,
                (args: unknown) => Promise<RpcResponse<unknown>>
              >,
            },
          },
        }),
      });
    },
  });
}
