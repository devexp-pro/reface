import { RefaceTemplateElement } from "../../RefaceTemplateElement.ts";
import type { ElementChildType } from "@reface/types";

export interface TemplatePartialOptions<T> {
  name: string;
  handler: (args?: any) => Promise<T>;
  attributes?: Record<string, unknown>;
  children?: ElementChildType[];
}

export class TemplatePartial<T> extends RefaceTemplateElement {
  public override type = "partial";
  public handler: (args?: any) => Promise<T>;

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
