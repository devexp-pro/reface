import type {
  ElementChild,
  ElementFactory,
  HTMLAttributes,
  Template,
} from "../core/mod.ts";
import * as elements from "../elements/mod.ts";

/**
 * Creates a Template from JSX
 */
export function createElement(
  tag: keyof typeof elements | Function,
  props: Record<string, unknown> | null,
  ...children: ElementChild[]
): Template {
  try {
    // Process children to handle arrays
    const processedChildren = children.flatMap((child) => {
      // Handle arrays (e.g. from map)
      if (Array.isArray(child)) {
        return child;
      }
      return child;
    });

    // Handle component functions
    if (typeof tag === "function") {
      // Handle styled components
      if ("className" in tag) {
        const styledComponent = tag as ElementFactory<HTMLAttributes> & {
          className: string;
        };
        const template = styledComponent(props || {});

        if (typeof template === "function") {
          return template(
            Object.assign([""], { raw: [""] }) as TemplateStringsArray,
            ...processedChildren
          );
        }
        return {
          ...template,
          children: processedChildren,
        };
      }

      // Handle regular components
      return tag({
        ...props,
        children:
          processedChildren.length === 1
            ? processedChildren[0]
            : processedChildren,
      });
    }

    // Get element factory
    const elementFn = elements[tag];
    if (!elementFn) {
      throw new Error(`Unknown element: ${String(tag)}`);
    }

    // Create template
    const template = elementFn(props || {});
    if (typeof template === "function") {
      return template(
        Object.assign([""], { raw: [""] }) as TemplateStringsArray,
        ...processedChildren
      );
    }

    return {
      ...template,
      children: processedChildren,
    };
  } catch (err) {
    const error = err as Error;
    throw new Error(`Error creating element ${String(tag)}: ${error.message}`);
  }
}
