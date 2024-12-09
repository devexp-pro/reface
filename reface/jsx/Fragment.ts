import { createLogger } from "@reface/core";
import { TemplateFragment } from "@reface/html";
import type { ElementChild } from "@reface/html";

const logger = createLogger("JSX:Fragment");

export function Fragment(
  _props: unknown,
  children: ElementChild[],
): TemplateFragment {
  logger.debug("Creating fragment", {
    childrenCount: children.length,
  });

  // Fragment просто создает TemplateFragment
  return new TemplateFragment(children);
}
