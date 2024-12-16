import { RefaceTemplateElement } from "../../RefaceTemplateElement.ts";
import type { ElementChildType } from "@reface/types";
import type { IPartialComponent } from "./types.ts";

export interface TemplatePartialOptions<T> {
  name: string;
  handler: (args?: unknown) => Promise<T>;
  attributes?: Record<string, unknown>;
  children?: ElementChildType[];
}

export class TemplatePartial<T> extends RefaceTemplateElement
  implements IPartialComponent<T> {
  public override type = "partial";
  public handler: (args?: unknown) => Promise<T>;

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
