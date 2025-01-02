import type { TemplateFactory } from "./types.ts";
export * from "./types.ts";
export * from "./utils.ts";

import { createTemplateFactory } from "./createTemplateFactory.ts";

export { processTemplateTagChildren } from "./processTemplateTagChildren.ts";

export { createTemplateFactory };
export const template: TemplateFactory = createTemplateFactory({
  type: "base",
});

export { REFACE_TEMPLATE, VOID_ELEMENTS } from "./constants.ts";
