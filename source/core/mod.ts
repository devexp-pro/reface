import type { Template } from "./Template.ts";
import { render } from "./render.ts";

export type {
  Template,
  TemplateFragment,
  HTMLAttributes,
  ElementChild,
} from "./types.ts";
export { isTemplateFragment } from "./types.ts";
export { escapeHTML, escapeAttribute } from "./escape.ts";
export { attributes } from "./attributes.ts";
export { render } from "./render.ts";

/**
 * Response helper for RPC calls
 */
export const RESPONSE = (html?: string | Template, status?: number) => ({
  html: typeof html === "string" ? html : html ? render(html) : undefined,
  status,
});
