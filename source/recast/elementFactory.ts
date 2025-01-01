import { createElementTemplate } from "./elements.ts";
import type { Template, TemplateHtmlAttributes } from "@reface/recast";

export const elementFactory = (
  tag: string,
): Template<TemplateHtmlAttributes, Record<string, any>> => {
  return createElementTemplate({ tag });
};
