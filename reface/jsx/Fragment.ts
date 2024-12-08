import type { ElementChild } from "@reface/html";
import type { FragmentProps } from "./types.ts";
import { Template } from "@reface/html";

/**
 * JSX Fragment component
 */
export function Fragment({ children }: FragmentProps): Template {
  return new Template({
    tag: "fragment",
    attributes: {},
    children: children || [],
  });
}

Fragment.isFragment = true as const;
Fragment.tag = "fragment";
