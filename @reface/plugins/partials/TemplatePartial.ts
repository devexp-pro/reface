import type { ElementChildType } from "@reface/types";
import { RefaceTemplate } from "../../RefaceTemplate.ts";
import { hx } from "@reface/htmx";

export interface TemplatePartialOptions<T> {
  name: string;
  handler: (args?: unknown) => Promise<T>;
  attributes?: Record<string, unknown>;
  children?: ElementChildType[];
}

export class TemplatePartial extends RefaceTemplate {
  static readonly type = "partial";

  constructor(data: TemplatePartialOptions<T>) {
    return super(data);
  }

  execute(): Promise<T> {
    return this.payload.partial.handler();
  }
  trigger = (trigger: string) => {
    return hx()
      .get(`/reface-partial/${this.payload.partial.name}`)
      .target(`[data-partial='${this.payload.partial.name}']`)
      .trigger(trigger || "click");
  };
}
