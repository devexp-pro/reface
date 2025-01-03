import type { HtmlContent } from "./types.ts";

export function createHtmlContent(content: string): HtmlContent {
  return {
    type: "html",
    content,
    meta: {},
  };
}

export function isHtmlContent(value: any): value is HtmlContent {
  return value?.type === "html";
}
