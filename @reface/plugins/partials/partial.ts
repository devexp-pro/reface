import {
  createTemplateFactory,
  type Template,
  type TemplateAttributes,
  type TemplatePayload,
} from "@reface/template";
import { hx } from "@reface/htmx";
import type { PartialFn, PartialHandler } from "./types.ts";

interface PartialPayload extends TemplatePayload {
  partial: {
    name: string;
    handler: PartialHandler<any>;
    apiPrefix: string;
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
        .get(
          `${template.payload.partial.apiPrefix}/${template.payload.partial.name}`,
        )
        .target(`[data-partial='${template.payload.partial.name}']`)
        .trigger("click");
    },
  },
});

export function createPartial<T>(
  handler: PartialHandler<T>,
  name: string,
  apiPrefix: string = "/reface/partial", // TODO: setup on plugin handler, for can dunamic api prefix
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
        apiPrefix,
      },
    },
  });
}

export const partial: PartialFn<any, Template> = (handler, name) => {
  return createPartial(handler, name);
};
