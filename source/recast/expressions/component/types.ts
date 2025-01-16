import type { EmptyRecord } from "@common/utility.types.ts";
import type { Child, Children, ProxyNode } from "../types.ts";
import type { RenderOptions } from "@recast/recast";

export interface ComponentAttributes extends Record<string, any> {
}

export type ComponentRenderFn<
  Props extends ComponentAttributes = ComponentAttributes,
> = (
  props: Props,
  children: Children,
  context: RenderOptions,
) => Children | Child;

export interface ComponentPayload {
  type: "component";
  name: string;
  id: string;
  attributes: ComponentAttributes;
  children: Children;
  render: ComponentRenderFn;
  meta: {
    [key: string]: unknown;
  };
  methods: Record<string, any>;
}

export type ComponentNode<
  Attrs extends ComponentAttributes = ComponentAttributes,
  Methods extends Record<string, any> = EmptyRecord,
> = ProxyNode<ComponentPayload, Attrs, Methods>;
