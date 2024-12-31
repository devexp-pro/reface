import type { Template } from "@reface/template";

export type SlotStrategy = "append" | "replace" | "merge";

export type SlotPayload = {
  slot: {
    name: symbol | string;
    content: JSX.Element;
    strategy?: SlotStrategy;
  };
};

export type TemplatePayload = {
  template: {
    slot: symbol | string;
    content: JSX.Element;
    scope?: "global" | "component";
    priority?: number;
  };
};

export type SlotComponent = Template<any, SlotPayload>;
export type TemplateComponent = Template<any, TemplatePayload>;
