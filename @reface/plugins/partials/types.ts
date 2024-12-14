import type { HxTrigger } from "../../htmx/builder.ts";
import type { TemplatePartial } from "./TemplatePartial.ts";

export interface PartialPluginOptions {
  apiPrefix?: string;
}

export interface PartialAPI<T> {
  (props?: Record<string, unknown>, children?: unknown[]): TemplatePartial;
  trigger(trigger?: HxTrigger): HxBuilder;
  execute(): Promise<T>;
}

export type PartialFn<T> = (
  handler: (data: T) => Promise<any>,
  name: string,
) => PartialAPI<T>;
