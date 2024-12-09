import { createLogger } from "@reface/core";
import type { ElementChildType } from "@reface/html";
import {
  Template,
  TemplateComponent,
  TemplateHtml,
  TemplateText,
} from "@reface/html";

const logger = createLogger("Component");

function convertToTemplateHtml(element: ElementChildType): TemplateHtml {
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

/**
 * Create component with props
 */
export function component<P extends object = {}>(
  renderFn: (props: P, children: ElementChildType[]) => ElementChildType,
) {
  logger.debug("Creating component", { renderFn: renderFn.name });

  const componentFn = function (props: P, jsxChildren?: ElementChildType[]) {
    logger.debug("Component called", {
      props,
      hasJsxChildren: !!jsxChildren,
      childrenCount: jsxChildren?.length,
    });

    // JSX вызов (с children)
    if (jsxChildren) {
      const result = renderFn(props, jsxChildren);
      logger.debug("JSX render result", {
        type: result?.constructor?.name,
        hasToHtml: result && typeof result === "object" && "toHtml" in result,
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

      logger.debug("Template literal render", {
        children,
        childrenContent: children.map((c) => c.toHtml({})),
      });

      const result = renderFn(props, children);
      return convertToTemplateHtml(result);
    };
  };

  return componentFn;
}
