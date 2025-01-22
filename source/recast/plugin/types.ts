import type { Recast } from "@recast/recast/mod.ts";
import type { Child, Children } from "@recast/expressions/mod.ts";

import type { RecastPlugin } from "./RecastPlugin.ts";
export interface RecastPluginInterface extends RecastPlugin {
  readonly name: string;

  setup(recast: Recast): void;
  renderBefore?<T extends Child | Children = Child | Children>(
    template: T,
  ): T | void;
  renderAfter?(
    template: Child | Children,
    html: string,
  ): string | void;
}
