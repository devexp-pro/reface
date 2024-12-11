import type { Template } from "@reface/html";
import { render } from "@reface/html";
import type { RefaceResponseType } from "../island/types.ts";

export const GET = (path: string) => `get|${path}`;
export const POST = (path: string) => `post|${path}`;
export const PUT = (path: string) => `put|${path}`;
export const PATCH = (path: string) => `patch|${path}`;
export const DELETE = (path: string) => `delete|${path}`;
export const RESPONSE = (
  html?: string | Template | Array<Template | any>,
  status?: number,
): RefaceResponseType => {
  if (
    html && (typeof html === "object" && "isTemplate" in html) ||
    Array.isArray(html)
  ) {
    return {
      html: render(html),
      status,
    };
  }

  return {
    html: typeof html === "string" ? html : undefined,
    status,
  };
};
