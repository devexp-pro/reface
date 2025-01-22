import type { RecastPlugin } from "@recast/plugin/mod.ts";
import type { Children } from "@recast/expressions/mod.ts";

export interface RecastStore {
  get<T>(pluginName: string): T | undefined;
  set<T>(pluginName: string, value: T): Map<string, unknown>;
}

export interface RecastContent {
  [key: string]: any;
}

export interface RenderOptions {
  [key: string]: any;
}
export interface RenderResult {
  html: string;
}

export interface RecastPluginManager {
  use(plugin: RecastPlugin): Promise<void>;
  getPlugin<T extends RecastPlugin>(name: string): T | undefined;
  getPlugin<T extends RecastPlugin>(
    plugin: new (...args: any[]) => T,
  ): T | undefined;
}

export interface RecastRenderer {
  render(
    template:
      | Children
      | (() => Children | Promise<Children>),
    context: RecastContent,
  ): Promise<RenderResult>;

  renderHTML(
    template:
      | Children
      | (() => Children | Promise<Children>),
    context: RecastContent,
  ): Promise<string>;
}

export interface Recast extends RecastPluginManager, RecastRenderer {
  store: RecastStore;
}
