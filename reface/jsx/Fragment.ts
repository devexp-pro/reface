import { createLogger } from "@reface/core";
import { TemplateFragment } from "@reface/html";
import type { ElementChildType } from "@reface/html";

const logger = createLogger("JSX:Fragment");

export function Fragment(
  _props: unknown,
  children: ElementChildType[],
): TemplateFragment {
  logger.debug("Creating fragment", {
    childrenCount: children.length,
  });

  // Fragment просто создает TemplateFragment
  return new TemplateFragment(children);
}
