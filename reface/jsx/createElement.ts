import { createLogger } from "@reface/core";
import { withErrorContext, pushComponent, popComponent } from "@reface/core";
import { Template, ElementChild, processAttributes } from "@reface/html";

import { getComponentType, processJSXProps } from "./utils.ts";
import { COMPONENT_TYPES } from "./constants.ts";
import { processJSXChildren } from "./children.ts";
import type { ComponentFunction } from "./types.ts";

const logger = createLogger("JSX");

/**
 * Create JSX element
 */
export function createElement(
  type: string | ComponentFunction,
  props: Record<string, unknown> | null,
  ...children: ElementChild[]
): Template {
  logger.debug("JSX Input", { type, props, children });

  return withErrorContext(
    () => {
      const componentType = getComponentType(type);
      const processedProps = props ? processJSXProps(props) : {};

      // Fragment handling
      if (componentType === "FRAGMENT") {
        const fragmentChildren = processJSXChildren(children);
        return {
          tag: "div",
          attributes: {},
          children: fragmentChildren,
          isTemplate: true,
          css: "",
          rootClass: "",
        };
      }

      // Component handling
      if (componentType === "FUNCTION") {
        const componentName = (type as Function).name || "AnonymousComponent";
        logger.debug(`Rendering component: ${componentName}`, {
          props: processedProps,
          children,
          type,
        });

        try {
          pushComponent(componentName);
          const component = type as ComponentFunction;
          return component({
            ...processedProps,
            children: children.length === 1 ? children[0] : children,
          });
        } finally {
          popComponent();
        }
      }

      // Element handling
      return {
        tag: type as string,
        attributes: processAttributes(processedProps),
        children: processJSXChildren(children),
        isTemplate: true,
        css: "",
        rootClass: "",
      };
    },
    { jsxStack: [] }
  );
}
