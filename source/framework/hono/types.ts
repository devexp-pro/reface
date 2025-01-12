import type { Element, FragmentNode } from "@recast";

declare module "@hono/hono" {
  interface ContextRenderer {
    (
      content: FragmentNode | Element,
    ): Response | Promise<Response>;
  }
}
