import { createTemplateFactory } from "@reface/recast";
import type { SlotAttributes, SlotMethods, SlotPayload } from "./types.ts";

const slotTemplate = createTemplateFactory<
  SlotAttributes,
  SlotPayload,
  SlotMethods
>({
  type: "slot",
  create: {
    defaults: {
      strategy: "append",
    },
  },
  methods: {
    getSlot: ({ template }: { template: SlotPayload }) => template.payload.slot,
  },
});

type SlotRender = (content: JSX.Element) => JSX.Element;

export function createSlot(name: string, render?: SlotRender) {
  const symbol = Symbol(name);

  return slotTemplate({
    tag: "slot",
    payload: {
      slot: {
        name: symbol,
        strategy: "append",
        render,
      },
    },
  });
}
