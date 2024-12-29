import type { Children, ElementNode } from "@recast/expressions";
export type SlotStrategy = "append" | "replace" | "merge";

export type SlotAttributes = {
  name?: symbol | string;
};

export type SlotPayload = {
  slot: {
    name: symbol | string;
    content: Children;
    strategy?: SlotStrategy;
  };
};

export type SlotMethods = {
  getSlot: () => symbol | string;
};

export type TemplateAttributes = {
  slot?: symbol | string;
  key?: string;
};

export type TemplatePayload = {
  template: {
    slot: symbol | string;
    children: Children;
    scope?: "global" | "component";
    priority?: number;
  };
};

export type SlotComponent = ElementNode<any, SlotPayload>;
export type TemplateComponent = ElementNode<any, TemplatePayload>;
