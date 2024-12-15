import { TemplateElement } from "../core/templates/TemplateElement.ts";
import { Template } from "../core/types.ts";

export class TemplateIsland extends TemplateElement {
  readonly type = "island";

  constructor(
    public name: string,
    public content: Template,
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
    content: Template,
    state?: unknown,
    rpc?: Record<string, (args: unknown) => Promise<unknown>>,
  ): TemplateIsland {
    return new TemplateIsland(name, content, state, rpc);
  }
}
