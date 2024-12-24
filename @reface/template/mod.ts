export * from "./types.ts";
export * from "./utils.ts";

import { createTemplateFactory } from "./createTemplateFactory.ts";

export { processChildren } from "./processChildren.ts";

export { createTemplateFactory };
export const template = createTemplateFactory({ type: "base" });

export { REFACE_TEMPLATE, VOID_ELEMENTS } from "./constants.ts";
