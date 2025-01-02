import { createTemplateFactory } from "@reface/recast";
import type { TemplatePayload } from "./types.ts";
import { TEMPLATE_TEMPLATE_NAME } from "./constants.ts";

export const createTemplate = createTemplateFactory<TemplatePayload>({
  type: TEMPLATE_TEMPLATE_NAME,
  create: {
    defaults: {
      payload: {
        template: {
          slot: "",
          children: "",
          scope: "global",
          priority: 0,
        },
      },
    },
  },
  process: {
    children: ({ newChildren, template }) => {
      if (template) {
        template.payload.template.children = newChildren;
      }
      return [];
    },
  },
  methods: {
    getScope: ({ template }) => template.payload.scope,
    getPriority: ({ template }) => template.payload.priority,
  },
});

export const Template = createTemplate({});
