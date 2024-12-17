import type { IRefaceTemplate } from "@reface/types";
import { RefaceTemplate } from "../RefaceTemplate.ts";

interface IslandPayload {
  island: {
    name: string;
    state?: unknown;
    rpc?: Record<string, (args: unknown) => Promise<unknown>>;
  };
}

export class TemplateIsland extends RefaceTemplate<
  { "data-island": string; id: string },
  IslandPayload
> {
  static override readonly type = "island";

  constructor(
    name: string,
    content: IRefaceTemplate,
    state?: unknown,
    rpc?: Record<string, (args: unknown) => Promise<unknown>>,
  ) {
    super({
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

  static create(
    name: string,
    content: IRefaceTemplate,
    state?: unknown,
    rpc?: Record<string, (args: unknown) => Promise<unknown>>,
  ): TemplateIsland {
    return new TemplateIsland(name, content, state, rpc);
  }
}
