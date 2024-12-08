import { createLogger } from "@reface/core";
import {
  isTemplateFragment,
  escapeHTML,
  type ElementChild,
} from "@reface/html";

import { getComponentType } from "./utils.ts";

const logger = createLogger("JSX:Children");

/**
 * Process JSX children
 */
export function processJSXChildren(children: unknown[]): ElementChild[] {
  return children.flatMap((child): ElementChild[] => {
    if (child == null || child === false || child === true) return [];

    if (isTemplateFragment(child)) {
      return [child];
    }

    if (Array.isArray(child)) {
      return processJSXChildren(child);
    }

    const componentType = getComponentType(child);

    if (componentType === "FUNCTION") {
      logger.debug("Processing component child", child);
      return [(child as Function)`` as ElementChild];
    }

    if (typeof child === "object" && child !== null && "isTemplate" in child) {
      return [child as ElementChild];
    }

    if (
      typeof child === "string" ||
      typeof child === "number" ||
      typeof child === "bigint"
    ) {
      return [escapeHTML(String(child))];
    }

    return [];
  });
}
