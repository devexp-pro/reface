import type {
  ElementChild,
  ElementFactory,
  HTMLAttributes,
  Template,
} from "../core/types.ts";
import * as elements from "../elements/mod.ts";
import { withJSXStack } from "./context.ts";
import { JSXError, withErrorTracking } from "../core/errors.ts";
import { createElementFactory } from "../elements/createElementFactory.ts";

/**
 * Process props including spread
 */
function processProps(
  props: Record<string, unknown> | null
): Record<string, unknown> {
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

  return result;
}

/**
 * Process children to handle arrays and fragments
 */
function processChildren(children: ElementChild[]): ElementChild[] {
  return children.flatMap((child) => {
    // Handle null/undefined
    if (child == null) return [];

    // Handle arrays (e.g. from map)
    if (Array.isArray(child)) {
      return processChildren(child);
    }

    // Handle fragments
    if (
      typeof child === "object" &&
      "isTemplate" in child &&
      child.tag === ""
    ) {
      return child.children;
    }

    return [child];
  });
}

/**
 * Creates a Template from JSX
 */
export function createElement(
  tag: string | Function,
  props: Record<string, unknown> | null,
  ...children: ElementChild[]
): Template {
  const componentName = typeof tag === "function" ? tag.name : String(tag);

  // Получаем информацию о местоположении из Error.stack
  const stack = new Error().stack;
  const location = stack ? parseStackLocation(stack) : {};

  return withJSXStack(componentName, location, () => {
    // Обрабатываем props и children до withErrorTracking
    const processedProps = processProps(props);
    const processedChildren = processChildren(children);

    return withErrorTracking(
      componentName,
      () => {
        // Handle component functions
        if (typeof tag === "function") {
          // Handle regular components
          const result = tag({
            ...processedProps,
            children:
              processedChildren.length === 1
                ? processedChildren[0]
                : processedChildren,
          });

          if (!result) {
            throw new JSXError(
              `Component returned undefined (${componentName})`,
              componentName,
              processedProps,
              children
            );
          }

          return result;
        }

        // Create template
        const template =
          tag in elements
            ? (
                elements[
                  tag as keyof typeof elements
                ] as ElementFactory<HTMLAttributes>
              )(processedProps as HTMLAttributes)
            : createElementFactory(tag)(processedProps as HTMLAttributes);
        if (!template) {
          throw new JSXError(
            "Element factory returned undefined",
            componentName,
            processedProps,
            children
          );
        }

        if (typeof template === "function") {
          return template(
            Object.assign([""], { raw: [""] }) as TemplateStringsArray,
            ...processedChildren
          );
        }

        return {
          ...(template as Template),
          children: processedChildren,
        };
      },
      processedProps
    );
  });
}

function parseStackLocation(stack: string) {
  const match = stack.split("\n")[2]?.match(/at .+\((.+):(\d+):(\d+)\)/);
  if (match) {
    return {
      file: match[1],
      line: parseInt(match[2]),
      column: parseInt(match[3]),
    };
  }
  return {};
}
