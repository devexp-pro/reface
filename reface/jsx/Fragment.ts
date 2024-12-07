import type { Template } from "../core/Template.ts";

/**
 * Fragment component for JSX
 */
export function Fragment({ children }: { children: unknown }): Template {
  return {
    tag: "",
    attributes: "",
    children: Array.isArray(children) ? children : [children],
    css: "",
    isTemplate: true,
    str: Object.assign([""], { raw: [""] }) as TemplateStringsArray,
    args: [],
    rootClass: "",
  };
}
