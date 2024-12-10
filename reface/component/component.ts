import { createLogger } from "@reface/core";
import type { ElementChildType } from "@reface/html";
import { TemplateHtml, TemplateText } from "@reface/html";
import type { ComponentFunction, ComponentRenderFunction } from "./types.ts";

const logger = createLogger("Component");

export function component<Props extends object = {}>(
  renderFn: ComponentRenderFunction<Props>,
): ComponentFunction<Props> {
  logger.debug("Creating component", { renderFn: renderFn.name });

  const componentFn = function (props: Props, children?: ElementChildType[]) {
    logger.debug("Component called", {
      props,
      childrenCount: children?.length,
    });

    // JSX вызов (с children)
    if (children) {
      const result = renderFn(props, children);
      logger.debug("JSX render result", {
        type: result?.constructor?.name,
      });
      return result;
    }

    // Template literal вызов
    return function (strings: TemplateStringsArray, ...values: any[]) {
      const children = strings.map((str, i) => {
        const text = new TemplateText(str, true);
        if (i < values.length) {
          const value = values[i];
          if (value instanceof TemplateHtml || value instanceof TemplateText) {
            return value;
          }
          return new TemplateText(String(value));
        }
        return text;
      }).filter((child) => child.content !== "");

      const result = renderFn(props, children);
      return result;
    };
  };

  return componentFn as ComponentFunction<Props>;
}
