import { createLogger } from "@reface/core";
import type { ElementChild } from "@reface/html";
import { Template, TemplateFragment } from "@reface/html";

const logger = createLogger("JSX");

export function createElement(
  type: string | Function,
  props: Record<string, unknown> | null,
  ...children: ElementChild[]
): ElementChild {
  logger.debug("Creating element", {
    tag: typeof type === "string" ? type : type.name,
    props,
    childrenCount: children.length,
  });

  // Если это Fragment
  if (typeof type === "function" && "isFragment" in type) {
    const flatChildren = children.flatMap((child) =>
      Array.isArray(child) ? child : [child]
    );

    return type({ ...props, children: flatChildren });
  }

  // Если это функциональный компонент
  if (typeof type === "function") {
    logger.debug("Creating function component", {
      name: type.name,
      props,
    });
    const result = type(props, children);
    if (!(result instanceof Template)) {
      logger.error("Function component must return a Template instance");
      throw new Error("Function component must return a Template instance");
    }
    return result;
  }

  // Если это обычный HTML элемент
  const template = new Template({
    tag: type,
    attributes: props || {},
    children: children.flatMap((child) =>
      Array.isArray(child) ? child : [child]
    ),
  });

  logger.debug("Created HTML element", {
    tag: type,
    props,
    childrenCount: children.length,
  });

  return template;
}
