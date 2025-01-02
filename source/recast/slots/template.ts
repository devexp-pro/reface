import { createTemplateFactory } from "@reface/recast";
import type { TemplateAttributes, TemplatePayload } from "./types.ts";
import { TEMPLATE_TEMPLATE_NAME } from "./constants.ts";

export const createTemplate = createTemplateFactory<
  TemplateAttributes,
  TemplatePayload
>({
  type: TEMPLATE_TEMPLATE_NAME,
  create: {
    defaults: {
      payload: {
        template: {},
      },
    },
  },
  process: {
    children: ({ newChildren, template }) => {
      if (template) {
        template.payload = {
          ...template.payload,
          template: {
            children: newChildren,
          },
        };
      }
      return [];
    },
  },
});

export const Template = createTemplate({});
