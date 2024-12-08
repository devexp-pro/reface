import type { Template } from "@reface/html";
import { render } from "@reface/html";

export const RESPONSE = (html?: string | Template, status?: number) => ({
  html: typeof html === "string" ? html : html ? render(html) : undefined,
  status,
});
