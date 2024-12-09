import { createLogger } from "@reface/core";
import type { ElementChildType } from "@reface/html";
import type { RenderContext } from "@reface/html/context.ts";
import {
  Template,
  TemplateComponent,
  TemplateHtml,
  TemplateText,
} from "@reface/html";

const logger = createLogger("Component");

function convertToTemplateHtml(
  element: ElementChildType,
  context: RenderContext,
): TemplateHtml {
  if (element instanceof TemplateHtml) {
    return element;
  }
  if (element instanceof Template) {
    return new TemplateHtml([element]);
  }
  if (typeof element === "string") {
    return new TemplateHtml([new TemplateText(element)]);
  }
  return new TemplateHtml([element]);
}

export function component<P extends object = {}>(
  renderFn: (props: P, children: ElementChildType[]) => ElementChildType,
) {
  logger.debug("Creating component", { renderFn: renderFn.name });

  const componentFn = function (props: P, children?: ElementChildType[]) {
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

  return componentFn;
}
