import { createTemplateFactory } from "@reface/recast";
import type { SlotAttributes, SlotMethods, SlotPayload } from "./types.ts";
import { SLOT_TEMPLATE_NAME } from "./constants.ts";

const slotTemplate = createTemplateFactory<
  SlotAttributes,
  SlotPayload,
  SlotMethods
>({
  type: SLOT_TEMPLATE_NAME,
  create: {
    defaults: {
      strategy: "append",
    },
  },
  methods: {
    getSlot: ({ template }: { template: SlotPayload }) =>
      template.payload.slot.name,
  },
});

type SlotRender = (content: JSX.Element) => JSX.Element;

export function createSlot(name: string, render?: SlotRender) {
  const symbol = Symbol(name);

  return slotTemplate({
    payload: {
      slot: {
        name: symbol,
        strategy: "append",
        render,
      },
    },
  });
}
