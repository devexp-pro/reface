import type {
  ElementChild,
  ElementFactory,
  HTMLAttributes,
  Template,
} from "../types/base.ts";
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
            ...children
          );
        }
        return {
          ...template,
          children,
        };
      }

      // Handle regular components
      return tag({
        ...props,
        children: children.length === 1 ? children[0] : children,
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
        ...children
      );
    }

    return {
      ...template,
      children,
    };
  } catch (err) {
    const error = err as Error;
    throw new Error(`Error creating element ${String(tag)}: ${error.message}`);
  }
}
