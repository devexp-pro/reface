import { createTemplateFactory } from "./createTemplateFactory.ts";

export * from "./types.ts";

export { processChildren } from "./processChildren.ts";

export { createTemplateFactory };
export const template = createTemplateFactory({ type: "base" });
