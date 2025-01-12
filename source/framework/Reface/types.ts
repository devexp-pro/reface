import type {
  ComponentNode,
  RecastPluginInterface,
  RenderResult,
} from "@recast";

export type RefaceLayoutFn = (params: RenderResult) => string;
export type RefaceLayout = ComponentNode<any, any> | RefaceLayoutFn;

export interface RefaceOptions {
  plugins?: RecastPluginInterface[];
  layout?: RefaceLayout;
  partialApiPrefix?: string;
}
