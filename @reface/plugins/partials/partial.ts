import type { PartialComponent, PartialFn, PartialHandler } from "./types.ts";
import {
  createTemplateFactory,
  TemplateAttributes,
  type TemplatePayload,
} from "@reface/template";
import { hx } from "@reface/htmx";

interface PartialPayload extends TemplatePayload {
  partial: {
    name: string;
    handler: (args?: unknown) => Promise<unknown>;
  };
}

const partialTemplate = createTemplateFactory<
  TemplateAttributes,
  PartialPayload
>({
  type: "partial",
  create: {
    defaults: {
      tag: "div",
      attributes: {},
      payload: {
        partial: {},
      },
    },
  },
  methods: {
    execute: ({ template }) => {
      return template.raw.payload.partial.handler();
    },
    trigger: ({ template }) => {
      return hx()
        .get(`/reface-partial/${template.raw.payload.partial.name}`)
        .target(`[data-partial='${template.raw.payload.partial.name}']`)
        .trigger("click");
    },
  },
});

function createPartial<T>(
  handler: PartialHandler<T>,
  name: string,
): PartialComponent<T> {
  return partialTemplate({
    attributes: {
      "data-partial": name,
    },
    payload: {
      partial: {
        name,
        handler,
      },
    },
  });
}

export const partial: PartialFn = (handler, name) => {
  return createPartial(handler, name);
};
