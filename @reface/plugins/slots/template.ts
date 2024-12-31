import { createTemplateFactory } from "@reface/template";
import type { TemplatePayload } from "./types.ts";

export const template = createTemplateFactory<TemplatePayload>({
  type: "template",
  create: {
    defaults: {
      scope: "global",
      priority: 0,
    },
  },
});
