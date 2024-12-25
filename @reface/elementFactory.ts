import { createElementTemplate } from "./elements.ts";
import type { Template, TemplateHtmlAttributes } from "@reface/template";

export const elementFactory = (
  tag: string,
): Template<TemplateHtmlAttributes, Record<string, any>> => {
  return createElementTemplate({ tag });
};
