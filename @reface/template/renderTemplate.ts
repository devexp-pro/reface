import { IRefaceRenderManager } from "@reface/types";
import { TemplateInstance } from "./types.ts";

export const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

export function renderTemplate(
  template: TemplateInstance,
  manager: IRefaceRenderManager,
): string {
  const content = manager.renderChildren(template.children);
  if (!template.tag) return content;

  const attrs = manager.renderAttributes(template.attributes);
  if (VOID_ELEMENTS.has(template.tag)) {
    return `<${template.tag}${attrs ? ` ${attrs}` : ""}/>`;
  }
  return `<${template.tag}${
    attrs ? ` ${attrs}` : ""
  }>${content}</${template.tag}>`;
}
