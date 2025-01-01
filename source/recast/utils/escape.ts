import { HTML_ENTITIES } from "../constants.ts";

export function escapeHTML(str: string): string {
  return str.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);
}

export function escapeAttribute(str: string): string {
  return str.replace(/["&]/g, (char) => HTML_ENTITIES[char]);
}
