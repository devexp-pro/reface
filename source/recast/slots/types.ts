import type { ComponentNode, HTMLAttributes } from "@recast/expressions/mod.ts";

export type SlotAttributes = {
  name?: symbol | string;
};

export type SlotMeta = {
  slot: {
    name: symbol | string;
    render?: (content: string[]) => string;
  };
};

export type SlotMethods = {
  getSlot: () => symbol | string;
};
export type SlotComponent = ComponentNode<
  SlotAttributes & HTMLAttributes,
  SlotMethods
>;

export type TemplateAttributes = {
  slot?: symbol | string;
  key?: string;
};

export type TemplateMeta = {
  template: true;
};
export type TemplateComponent = ComponentNode<
  TemplateAttributes,
  Record<string, any>
>;
