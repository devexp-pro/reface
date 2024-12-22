export type {
  ComponentFn,
  RawTemplate,
  RawTemplateAttributes,
  Template,
  TemplateAttributes,
  TemplateFactory,
  TemplateFactoryConfig,
  TemplateMethods,
  TemplatePayload,
} from "./types.ts";
export { REFACE_TEMPLATE } from "./types.ts";
export * from "./utils.ts";

import { createTemplateFactory } from "./createTemplateFactory.ts";

export { processChildren } from "./processChildren.ts";

export { createTemplateFactory };
export const template = createTemplateFactory({ type: "base" });
