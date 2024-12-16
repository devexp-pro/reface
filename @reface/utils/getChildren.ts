import type { ElementChildType } from "@reface/types";
import { RefaceTemplateHtml } from "../RefaceTemplateHtml.ts";
import { RefaceTemplateText } from "../RefaceTemplateText.ts";
import { isEmptyValue, isTemplate } from "./renderUtils.ts";

export const getChildren = (
  strings: TemplateStringsArray | string,
  values: ElementChildType[],
): ElementChildType[] => {
  if (typeof strings === "string") {
    return [new RefaceTemplateHtml([strings.trim()])];
  }

  const children: ElementChildType[] = [];

  for (let i = 0; i < strings.length; i++) {
    const trimmed = strings[i];
    if (trimmed) {
      children.push(new RefaceTemplateHtml([trimmed]));
    }

    if (i < values.length) {
      const value = values[i];
      if (Array.isArray(value)) {
        children.push(...value);
      } else if (isTemplate(value)) {
        children.push(value);
      } else if (!isEmptyValue(value)) {
        children.push(new RefaceTemplateText(String(value)));
      }
    }
  }

  return children;
};