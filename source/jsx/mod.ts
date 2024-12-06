import type {
  ElementChild,
  ElementFactory,
  HTMLAttributes,
} from "../types/base.ts";
import type { JSXProps } from "./types.ts";
import type { Template } from "../types/mod.ts";
import * as elements from "../elements/mod.ts";

/**
 * Creates a Template from JSX
 */
export function createElement(
  tag: keyof typeof elements | Function,
  props: JSXProps | null,
  ...children: ElementChild[]
): Template {
  try {
    // Process children
    const processedChildren = children
      .flat()
      .filter(
        (child) => child !== null && child !== undefined && child !== false
      );

    // Handle component functions
    if (typeof tag === "function") {
      return tag({
        ...props,
        children: children.length === 1 ? children[0] : children,
      });
    }

    // Get element factory
    const elementFn = elements[tag] as ElementFactory<HTMLAttributes>;
    if (!elementFn) {
      throw new Error(`Unknown element: ${String(tag)}`);
    }

    // Create template
    const processedProps: Record<string, unknown> = {};
    if (props) {
      Object.entries(props).forEach(([key, value]) => {
        if (key === "className") {
          processedProps.class = value;
        } else if (key.startsWith("on") && typeof value === "function") {
          processedProps[key.toLowerCase()] = value();
        } else {
          processedProps[key] = value;
        }
      });
    }

    // Create template using element factory
    const template = elementFn(processedProps as HTMLAttributes);
    if (typeof template === "function") {
      return template(
        Object.assign([""], { raw: [""] }) as TemplateStringsArray,
        ...processedChildren
      );
    }
    return template;
  } catch (err) {
    const error = err as Error;
    throw new Error(`Error creating element ${String(tag)}: ${error.message}`);
  }
}
