import type { ElementFactoryFn } from "@reface/types";
import { RefaceTemplateElement } from "./RefaceTemplateElement.ts";

export const elementFactory: ElementFactoryFn = (tag) => {
  return new RefaceTemplateElement({ tag });
};
