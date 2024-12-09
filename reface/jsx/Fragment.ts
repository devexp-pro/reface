import type { ElementChild } from "@reface/html";
import type { FragmentProps } from "./types.ts";
import { TemplateFragment } from "@reface/html";
import { createLogger } from "@reface/core";

const logger = createLogger("JSX:Fragment");

/**
 * JSX Fragment component
 */
export function Fragment(props: FragmentProps): TemplateFragment {
  logger.debug("Fragment called", {
    childrenCount: props.children?.length,
    children: props.children,
  });

  // Убедимся, что дети всегда массив
  const children = Array.isArray(props.children)
    ? props.children
    : props.children
    ? [props.children]
    : [];

  return new TemplateFragment(children);
}

Fragment.isFragment = true as const;
Fragment.tag = "fragment";
