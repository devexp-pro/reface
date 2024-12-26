import {
  createTemplateFactory,
  type TemplateAttributes,
  type TemplatePayload,
} from "@reface/template";
import { hx } from "@reface/htmx";
import type { PartialFn, PartialHandler } from "./types.ts";

interface PartialPayload extends TemplatePayload {
  partial: {
    name: string;
    handler: PartialHandler<unknown>;
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
    },
  },
  methods: {
    execute: ({ template }) => {
      return template.payload.partial.handler({});
    },
    trigger: ({ template }) => {
      return hx()
        .get(`/reface-partial/${template.payload.partial.name}`)
        .target(`[data-partial='${template.payload.partial.name}']`)
        .trigger("click");
    },
  },
});

function createPartial<C, T>(
  handler: PartialHandler<C, T>,
  name: string,
) {
  return partialTemplate({
    tag: "div",
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

export const partial: PartialFn<unknown> = (handler, name) => {
  return createPartial(handler, name);
};
