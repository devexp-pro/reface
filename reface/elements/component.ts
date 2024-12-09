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
  renderFn: (props: P, children?: ElementChildType[]) => Template,
) {
  logger.debug("Creating component", {
    renderFn: renderFn.name || "Anonymous",
  });

  const componentFn = (props: P) => {
    logger.debug("Component called", { props });

    // Если есть children в props, это JSX вызов
    if ("children" in props) {
      const { children, ...restProps } = props;
      return renderFn(
        restProps as P,
        Array.isArray(children) ? children : [children],
      );
    }

    // Создаем функцию для template literals
    function templateLiteral(
      strings: TemplateStringsArray,
      ...values: ElementChildType[]
    ): Template {
      logger.debug("Template literal called", {
        stringsCount: strings.length,
        valuesCount: values.length,
      });

      // Собираем массив элементов
      const result: ElementChildType[] = [];

      for (let i = 0; i < strings.length; i++) {
        if (strings[i]) {
          result.push(strings[i]);
        }

        if (i < values.length) {
          const value = values[i];
          if (value != null) {
            if (Array.isArray(value)) {
              result.push(...value);
            } else if (value instanceof Template) {
              result.push(value);
            } else {
              result.push(new TemplateText(String(value)));
            }
          }
        }
      }

      // Создаем фрагмент с собранными элементами
      const fragment = new TemplateFragment(result);

      // Передаем фрагмент как children в renderFn
      return renderFn(props, [fragment]);
    }

    // Возвращаем функцию с поддержкой template literals
    return Object.assign(templateLiteral, {
      isTemplate: true as const,
    });
  };

  return Object.assign(componentFn, {
    isTemplate: true as const,
  });
}
