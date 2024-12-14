import { TemplateElement } from "../../core/templates/TemplateElement.ts";
import type { ElementChildType } from "../../core/types.ts";

export interface TemplatePartialOptions<T> {
  name: string;
  handler: () => Promise<T>;
  attributes?: Record<string, unknown>;
  children?: ElementChildType[];
}

export class TemplatePartial<T> extends TemplateElement {
  public override type = "partial";
  public handler: () => Promise<T>;

  constructor(options: TemplatePartialOptions<T>) {
    super({
      tag: "div",
      attributes: {
        ...options.attributes,
        "data-partial": options.name,
      },
      children: options.children || [],
    });

    this.handler = options.handler;
  }

  execute(): Promise<T> {
    return this.handler();
  }
}
