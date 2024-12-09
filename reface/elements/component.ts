import { createLogger } from "@reface/core";
import type { ElementChildType } from "@reface/html";
import { Template, TemplateComponent, TemplateText } from "@reface/html";

const logger = createLogger("Component");

/**
 * Create component with props
 */
export function component<P extends object = {}>(
  renderFn: (props: P, children: ElementChildType[]) => ElementChildType,
) {
  logger.debug("Creating component", { renderFn: renderFn.name });

  return function (props: P) {
    logger.debug("Component called with props", { props });

    return function (strings: TemplateStringsArray, ...values: any[]) {
      const children = strings.map((str, i) => {
        const text = new TemplateText(str);
        if (i < values.length) {
          const value = values[i];
          if (value instanceof TemplateText) {
            return value;
          }
          return new TemplateText(String(value));
        }
        return text;
      }).filter((child) => child.content !== "");

      logger.debug("Rendering component with children", {
        children,
        childrenContent: children.map((c) => c.content),
      });

      const result = renderFn(props, children);
      logger.debug("RenderFn result type", {
        type: result?.constructor?.name,
        hasToHtml: result && typeof result === "object" && "toHtml" in result,
      });

      if (!(result instanceof Template)) {
        logger.error("RenderFn must return Template instance");
        throw new Error("RenderFn must return Template instance");
      }

      return result;
    };
  };
}
