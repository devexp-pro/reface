import { createLogger } from "@reface/core";
import type { ElementChildType } from "@reface/html";
import { Template } from "@reface/html";
import { TemplateFragment } from "@reface/html";
import { TemplateText } from "@reface/html";

const logger = createLogger("Component");

/**
 * Create component with props
 */
export function component<P extends Record<string, unknown>>(
  renderFn: (props: P, children: ElementChildType[]) => Template,
) {
  logger.debug("Creating component", {
    renderFn: renderFn.name || "Anonymous",
  });

  function componentFn(props: P, children?: ElementChildType[]) {
    logger.debug("Component called", {
      props,
      childrenCount: children?.length,
    });

    // Если есть children, это JSX вызов
    if (children) {
      return renderFn(props, children);
    }

    // Иначе возвращаем функцию для template literals
    return function templateLiteral(
      strings: TemplateStringsArray,
      ...values: ElementChildType[]
    ): Template {
      logger.debug("Template literal called", {
        stringsCount: strings.length,
        valuesCount: values.length,
      });

      const result: ElementChildType[] = [];

      for (let i = 0; i < strings.length; i++) {
        if (strings[i]) {
          result.push(new TemplateText(strings[i]));
        }

        if (i < values.length) {
          const value = values[i];
          if (value != null) {
            if (Array.isArray(value)) {
              result.push(
                ...value.map((v) =>
                  v instanceof Template ? v : new TemplateText(String(v))
                ),
              );
            } else if (value instanceof Template) {
              result.push(value);
            } else {
              result.push(new TemplateText(String(value)));
            }
          }
        }
      }

      return renderFn(props, result);
    };
  }

  return Object.assign(componentFn, {
    isTemplate: true as const,
  });
}
