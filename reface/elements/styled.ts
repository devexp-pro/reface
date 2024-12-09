import { Template } from "@reface/html";
import type {
  ComponentFunction,
  ElementChild,
  HTMLAttributes,
  StyledComponent,
  StyledFactory,
} from "./types.ts";
import { generateClassName, processAttributes, processCSS } from "@reface/html";
import { createLogger } from "@reface/core";

const logger = createLogger("Styled");

/**
 * Create styled component
 */
function createStyledComponent<P extends HTMLAttributes>(
  tag: string,
  css: string,
): StyledComponent<P> {
  const rootClass = generateClassName();
  const processedCss = processCSS(css, rootClass);

  const fn = Template.createTemplateFunction(tag);

  function styledFn(
    propsOrStrings?: P | TemplateStringsArray,
    ...values: ElementChild[]
  ): Template {
    // Template literal call: StyledDiv`Hello`
    if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
      // Собираем строки и значения в один массив
      const children = propsOrStrings.reduce((acc: ElementChild[], str, i) => {
        if (str) acc.push(str);
        if (i < values.length) acc.push(values[i]);
        return acc;
      }, []);

      return new Template({
        tag,
        attributes: { class: [rootClass] },
        children,
        css: processedCss,
        rootClass,
      });
    }

    // Props call: StyledDiv({ props })
    const props = propsOrStrings || {} as P;
    const { children: propsChildren, ...restProps } = props;

    // Обрабатываем атрибуты без children
    const attributes = processAttributes(restProps);

    // Добавляем rootClass к существующим классам
    attributes.class = Array.isArray(attributes.class)
      ? [rootClass, ...attributes.class]
      : [rootClass];

    // Если есть children, возвращаем Template
    if (propsChildren) {
      return new Template({
        tag,
        attributes,
        children: Array.isArray(propsChildren)
          ? propsChildren
          : [propsChildren],
        css: processedCss,
        rootClass,
      });
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

      return new Template({
        tag,
        attributes,
        children,
        css: processedCss,
        rootClass,
      });
    };

    return Object.assign(templateFn, {
      isTemplate: true as const,
      tag,
      css: processedCss,
      rootClass,
    });
  }

  return Object.assign(styledFn, {
    isTemplate: true as const,
    tag,
    css: processedCss,
    rootClass,
  });
}

/**
 * Styled components factory
 */
export const styled = new Proxy(
  ((component: ComponentFunction) => {
    logger.debug("Extending component with styles", {
      tag: component.tag,
      hasExistingCss: Boolean(component.css),
    });

    return (strings: TemplateStringsArray | string, ...values: unknown[]) => {
      try {
        const newCss = typeof strings === "string"
          ? strings
          : String.raw({ raw: strings.raw }, ...(values || []));
        const originalCss = component.css || "";

        logger.debug("Combining CSS", {
          originalLength: originalCss.length,
          newLength: newCss.length,
        });

        return createStyledComponent(
          component.tag,
          `${originalCss}\n${newCss}`,
        );
      } catch (error: unknown) {
        if (error instanceof Error) {
          logger.error("Failed to extend component", error, {
            tag: component.tag,
            strings,
            values,
          });
        } else {
          logger.error(
            "Unknown error extending component",
            new Error(String(error)),
            { tag: component.tag, strings, values },
          );
        }
        throw error;
      }
    };
  }) as StyledFactory,
  {
    get(target, prop) {
      logger.debug("Creating new styled component", { tag: String(prop) });

      return (strings: TemplateStringsArray, ...values: unknown[]) => {
        try {
          const css = typeof strings === "string"
            ? strings
            : String.raw({ raw: strings.raw }, ...(values || []));
          return createStyledComponent(prop as string, css);
        } catch (error: unknown) {
          if (error instanceof Error) {
            logger.error("Failed to create new styled component", error, {
              tag: String(prop),
              strings,
              values,
            });
          } else {
            logger.error(
              "Unknown error creating new styled component",
              new Error(String(error)),
              { tag: String(prop), strings, values },
            );
          }
          throw error;
        }
      };
    },
  },
);
