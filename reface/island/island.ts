import { Template } from "@reface/html";
import { TemplateIsland } from "./TemplateIsland.ts";
import type { IslandType, RestHandlersType, RpcHandlersType } from "./types.ts";

let islandsCount = 0;
const islandRestHandlers: Record<string, RestHandlersType> = {};
const islandRpcHandlers: Record<string, RpcHandlersType<any>> = {};

export function createIsland<R, P>(
  body: IslandType<R, P>,
): (props: P) => TemplateIsland {
  const name = body.name || `c${islandsCount++}`;

  if (body.rest) {
    islandRestHandlers[name] = body.rest;
  }

  if (body.rpc) {
    islandRpcHandlers[name] = body.rpc;
  }

  return (props: P) => {
    return new TemplateIsland(
      name,
      {
        template: body.template,
        props,
        rpc: { hx: {} },
        rest: {
          hx: (islandName, method, route: string) =>
            islandName === "self"
              ? `hx-${method}='/api/${name}${route}'`
              : `hx-${method}='/api/${islandName}${route}'`,
        },
      },
      body.rpc,
      body.rest,
    );
  };
}

export function island<R, P>(
  body: IslandType<R, P>,
): (props: P) => TemplateIsland {
  return createIsland(body);
}
