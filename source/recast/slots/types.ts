import type { Template } from "@reface/recast";

export type SlotStrategy = "append" | "replace" | "merge";

export type SlotAttributes = {
  name: symbol | string;
};

export type SlotPayload = {
  slot: {
    name: symbol | string;
    content: JSX.Element;
    strategy?: SlotStrategy;
  };
};

export type SlotMethods = {
  getSlot: () => symbol | string;
};

export type TemplatePayload = {
  template: {
    slot: symbol | string;
    children: JSX.Element;
    scope?: "global" | "component";
    priority?: number;
  };
};

export type SlotComponent = Template<any, SlotPayload>;
export type TemplateComponent = Template<any, TemplatePayload>;
