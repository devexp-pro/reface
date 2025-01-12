import { component } from "@recast/component";
import type { TemplateAttributes, TemplateComponent } from "./types.ts";

export const Template: TemplateComponent = component<TemplateAttributes>(
  (_, children) => children,
  {
    meta: {
      template: true,
    },
  },
);
