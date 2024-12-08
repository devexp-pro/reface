import type { ElementChild } from "@reface/html";
import type { FragmentProps } from "./types.ts";

/**
 * JSX Fragment component
 */
export function Fragment({ children }: FragmentProps): ElementChild[] {
  return children || [];
}

Fragment.isFragment = true as const;
