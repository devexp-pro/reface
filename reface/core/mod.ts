export * from "./constants.ts";
export * from "./utils.ts";
export * from "./types.ts";
export * from "./errors.ts";
export * from "./logger.ts";
export * from "./ErrorContext.ts";

// FIXME
import type { Template } from "@reface/html";
import { render } from "@reface/html";
export const RESPONSE = (html?: string | Template, status?: number) => ({
  html: typeof html === "string" ? html : html ? render(html) : undefined,
  status,
});
