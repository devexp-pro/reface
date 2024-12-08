import { createLogger } from "@reface/core";
import { Template } from "@reface/html";
import type {
  ComponentFunction,
  ElementChild,
  HTMLAttributes,
} from "./types.ts";

const logger = createLogger("Component");

/**
 * Create component function
 */
export function component<T extends object>(
  render: (props: T, children: ElementChild[]) => Template,
): ComponentFunction<T & HTMLAttributes> {
  logger.debug("Creating component", { renderFn: render.name || "Anonymous" });

  // Оборачиваем для поддержки компонентов
  return Object.assign(
    (props?: T & HTMLAttributes) => {
      try {
        // Props call: Component({ props })
        const { children: propsChildren, ...restProps } = props ||
          {} as T & HTMLAttributes;

        logger.debug("Processing props call", {
          hasChildren: Boolean(propsChildren),
          props: restProps,
        });

        // Если есть children, это JSX вызов
        if (propsChildren) {
          return render(
            restProps as T,
            Array.isArray(propsChildren) ? propsChildren : [propsChildren],
          );
        }

        // Иначе возвращаем функцию для template literals
        const templateFn = (
          strings: TemplateStringsArray,
          ...templateValues: ElementChild[]
        ) => {
          // Собираем строки и значения в один массив
          const children = strings.reduce((acc: ElementChild[], str, i) => {
            if (str) acc.push(str);
            if (i < templateValues.length) acc.push(templateValues[i]);
            return acc;
          }, []);

          return render(restProps as T, children);
        };

        return Object.assign(templateFn, {
          isTemplate: true as const,
          tag: "div",
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          logger.error("Component function failed", error, {
            props,
          });
        } else {
          logger.error(
            "Unknown error in component function",
            new Error(String(error)),
            { props },
          );
        }
        throw error;
      }
    },
    {
      isTemplate: true as const,
      tag: "div",
    },
  );
}
