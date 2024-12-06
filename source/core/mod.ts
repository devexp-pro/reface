import type { Template } from "./Template.ts";
import { render } from "./render.ts";

export type { Template, ElementChild, ElementFactory } from "./Template.ts";
export { render } from "./render.ts";

/**
 * Response helper for RPC calls
 */
export const RESPONSE = (html?: string | Template, status?: number) => ({
  html: typeof html === "string" ? html : html ? render(html) : undefined,
  status,
});
