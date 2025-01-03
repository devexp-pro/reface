import type { TextContent } from "./types.ts";

const TEXT_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
};

export function escapeText(str: string): string {
  return str.replace(/[&<>"']/g, (char) => TEXT_ENTITIES[char]);
}

export function isTextContent(value: any): value is TextContent {
  return typeof value === "string" || typeof value === "number";
}
