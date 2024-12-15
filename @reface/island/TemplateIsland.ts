import { RefaceTemplateElement } from "@reface";
import type { IRefaceTemplate } from "@reface/types";

export class TemplateIsland extends RefaceTemplateElement {
  public override type = "island";

  constructor(
    public name: string,
    public content: IRefaceTemplate,
    public state?: unknown,
    public rpc?: Record<string, (args: unknown) => Promise<unknown>>,
  ) {
    super({
      tag: "div",
      attributes: {
        "data-island": name,
        id: `island-${name}`,
      },
      children: [content],
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
