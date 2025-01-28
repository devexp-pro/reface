import type { ComponentNode, HTMLAttributes } from "@recast/expressions/mod.ts";

export type SlotAttributes = {
  name?: string;
};

export type SlotMeta = {
  slot: {
    name: string;
    render?: (content: string[]) => string;
  };
};

export type SlotMethods = {
  getSlot: () => string;
};
export type SlotComponent = ComponentNode<
  SlotAttributes & HTMLAttributes,
  SlotMethods
>;

export type TemplateAttributes = {
  slot?: string;
  key?: string;
};

export type TemplateMeta = {
  template: true;
};
export type TemplateComponent = ComponentNode<
  TemplateAttributes,
  Record<string, any>
>;
