import type {
  ElementChild,
  ElementFactory,
  HTMLAttributes,
  Template,
} from "../core/Template.ts";
import * as elements from "../elements/mod.ts";

/**
 * Process props including spread
 */
function processProps(props: Record<string, unknown> | null): HTMLAttributes {
  if (!props) return {};

  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    // Handle spread
    if (key === "__spread") {
      Object.assign(result, value);
      continue;
    }

    // Handle special props
    if (key === "ref" || key === "key") continue;

    result[key] = value;
  }

  return result as HTMLAttributes;
}

/**
 * Creates a Template from JSX
 */
export function createElement(
  tag: keyof typeof elements | Function,
  props: Record<string, unknown> | null,
  ...children: ElementChild[]
): Template {
  try {
    const processedProps = processProps(props);
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
        const template = styledComponent(processedProps);

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
        ...processedProps,
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
    const template = elementFn(processedProps);
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
