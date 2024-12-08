import type { JSXElementProps } from "./types.ts";

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

export function createElement(
  type: string | ComponentFunction,
  props: Record<string, unknown> | null,
  ...children: ElementChild[]
): Template {
  logger.debug("JSX Input", { type, props, children });

  return withErrorContext(() => {
    // Обработка children, разворачиваем массивы и фрагменты
    const processedChildren = children.flatMap((child) => {
      // Если это массив, разворачиваем его рекурсивно
      if (Array.isArray(child)) {
        return child.flatMap((c) => {
          // Если это фрагмент внутри массива
          if (typeof c === "object" && c && "type" === "fragment") {
            return c.content;
          }
          return c;
        });
      }
      // Если это фрагмент
      if (typeof child === "object" && child && "type" === "fragment") {
        return child.content;
      }
      return child;
    });

    // Fragment
    if (type === Fragment) {
      return processedChildren;
    }

    // Компонент
    if (typeof type === "function") {
      const componentName = type.name || "AnonymousComponent";
      logger.debug(`Rendering component: ${componentName}`, {
        props,
        children,
        type,
      });

      try {
        pushComponent(componentName);

        const result = type(props || {}, processedChildren);

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

    // HTML элемент
    return {
      tag: type,
      attributes: processAttributes(props || {}),
      children: processedChildren,
      isTemplate: true,
      css: "",
      rootClass: "",
    };
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
