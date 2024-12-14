import { TemplateElement } from "../../core/templates/TemplateElement.ts";
import type { ElementChildType } from "../../core/types.ts";

export interface TemplateIslandOptions<T> {
  name: string;
  handler: () => Promise<T>;
  attributes?: Record<string, unknown>;
  children?: ElementChildType[];
}

export class TemplateIsland<T> extends TemplateElement {
  public override type = "island";
  public handler: () => Promise<T>;

  constructor(options: TemplateIslandOptions<T>) {
    super({
      tag: "div",
      attributes: {
        ...options.attributes,
        "data-island": options.name,
      },
      children: options.children || [],
    });

    this.handler = options.handler;
  }

  execute(): Promise<T> {
    return this.handler();
  }
}
