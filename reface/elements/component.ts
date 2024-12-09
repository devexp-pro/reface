import { createLogger } from "@reface/core";
import type { ElementChildType } from "@reface/html";
import { Template } from "@reface/html";
import { html } from "@reface/html";

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

      // Используем html для создания Template
      const template = html(strings, ...values);

      // Передаем Template как children
      return renderFn(props, [template]);
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
