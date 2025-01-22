import { component } from "@recast/component/mod.ts";
import type { TemplateAttributes, TemplateComponent } from "./types.ts";

export const Template: TemplateComponent = component<TemplateAttributes>(
  (_, children) => children,
  {
    meta: {
      template: true,
    },
  },
);
