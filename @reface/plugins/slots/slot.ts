import { createTemplateFactory } from "@reface/template";
import type { SlotPayload } from "./types.ts";

const slotTemplate = createTemplateFactory<SlotPayload>({
  type: "slot",
  create: {
    defaults: {
      strategy: "append",
    },
  },
});

type SlotRender = (content: JSX.Element) => JSX.Element;

export function createSlot(name: string, render?: SlotRender) {
  const symbol = Symbol(name);

  return Object.assign(
    slotTemplate({
      payload: {
        slot: {
          name: symbol,
          strategy: "append",
          render,
        },
      },
    }),
    { slot: symbol },
  );
}
