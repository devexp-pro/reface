import type {
  Template,
  ElementChild,
  TemplateLiteralFunction,
} from "../html/types.ts";
import { processAttributes } from "../html/attributes.ts";
import { processJSXChildren } from "./children.ts";
import { createLogger } from "../core/logger.ts";
import {
  withErrorContext,
  pushComponent,
  popComponent,
} from "../core/ErrorContext.ts";
import { Fragment } from "./Fragment.ts";

const logger = createLogger("JSX");

/**
 * Create element from JSX
 */
export function createElement(
  type: string | ComponentFunction,
  props: Record<string, unknown> | null,
  ...children: unknown[]
): Template {
  logger.debug("JSX Input", { type, props, children });

  return withErrorContext(() => {
    // Если type это функция (компонент)
    if (typeof type === "function") {
      const componentName = type.name || "AnonymousComponent";
      logger.debug(`Rendering component: ${componentName}`, {
        props,
        children,
        type,
      });

      try {
        pushComponent(componentName);

        const processedChildren = processJSXChildren(children);
        logger.debug("Processed children", processedChildren);

        // Специальная обработка для Fragment
        if (type === Fragment) {
          return processedChildren;
        }

        const result = type(
          {
            ...props,
          },
          processedChildren
        );

        // Если это TemplateLiteralFunction
        if (typeof result === "function") {
          logger.debug(
            "Component returned template literal function",
            processedChildren
          );
          return result`${processedChildren}` as Template;
        }

        logger.debug("Component returned template", result);
        return result;
      } catch (error) {
        logger.error("Component error", error, {
          component: componentName,
          props,
        });
        throw error;
      } finally {
        popComponent();
      }
    }

    // Создаем элемент
    const element = {
      tag: type,
      attributes: processAttributes(props || {}),
      children: processJSXChildren(children),
      isTemplate: true,
      css: "",
      rootClass: "",
    };

    logger.debug("Created element", element);
    return element;
  }, "jsxStack");
}

/**
 * Component function type
 */
interface ComponentFunction {
  (props?: any): Template | TemplateLiteralFunction;
  isTemplate?: true;
  tag?: string;
  css?: string;
  rootClass?: string;
}
