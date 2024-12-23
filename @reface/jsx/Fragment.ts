import { createTemplateFactory } from "../template/createTemplateFactory.ts";
import type { ElementChildType, Template } from "../template/types.ts";
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
