import { createTemplateFactory } from "@recast";
import type { ElementChildType, Template } from "@recast";
const fragmentTemplate = createTemplateFactory({
  type: "fragment",
  create: {
    defaults: {
      attributes: {},
    },
  },
});

export function Fragment(_: any, children: ElementChildType[]): Template {
  return fragmentTemplate({
    children,
  });
}
