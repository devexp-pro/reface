import type { Template } from "../core/types.ts";
import { processAttributes } from "../html/attributes.ts";

/**
 * Fragment component for JSX
 */
export function Fragment({ children }: { children: unknown }): Template {
  return {
    tag: "",
    attributes: processAttributes({}),
    children: Array.isArray(children) ? children : [children],
    css: "",
    isTemplate: true,
    rootClass: "",
  };
}
