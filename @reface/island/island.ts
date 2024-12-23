import {
  createTemplateFactory,
  type Template,
  type TemplatePayload,
} from "@reface/template";

interface IslandPayload extends TemplatePayload {
  island: {
    name: string;
    state?: unknown;
    rpc?: Record<string, (args: unknown) => Promise<unknown>>;
  };
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

export const island = {
  create: createIsland,
};
