import type { HxTrigger } from "../../htmx/builder.ts";
import type { TemplateIsland } from "./TemplateIsland.ts";

export interface IslandPluginOptions {
  apiPrefix?: string;
}

export interface IslandAPI<T> {
  (props?: Record<string, unknown>, children?: unknown[]): TemplateIsland;
  trigger(trigger?: HxTrigger): HxBuilder;
  execute(): Promise<T>;
}

export type IslandFn<T> = (
  handler: (data: T) => Promise<any>,
  name: string,
) => IslandAPI<T>;
