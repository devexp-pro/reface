import type {
  HTMLAttributes,
  ElementChild,
  ElementFactory,
  Template,
} from "../types/base.ts";
import type {
  StyledComponent,
  StyledFactory,
  StyleInterpolation,
  StyledAPI,
} from "./types.ts";

import { createElementFactory } from "../elements/createElementFactory.ts";
import { generateClassName } from "../helpers/mod.ts";
import { attributes } from "../html/attributes.ts";
import { render } from "../core/render.ts";
import * as elements from "../elements/mod.ts";

/**
 * Creates a styled component
 */
function createStyled<T extends HTMLAttributes>(
  elementFactory: ReturnType<typeof createElementFactory<T>>
): StyledFactory<T> {
  return (strings: TemplateStringsArray, ...values: StyleInterpolation[]) => {
    const className = generateClassName();
    const tag = elementFactory.name?.toLowerCase() || "div";
    const css = processStyles(strings, values, className);

    const styledComponent = Object.assign(
      ((props: T = {} as T) => {
        const mergedProps = {
          ...props,
          class: `${className} ${props.class || ""}`.trim(),
        };

        const factory = (
          strings?: TemplateStringsArray,
          ...children: ElementChild[]
        ): Template => {
          const emptyTemplate = Object.assign([""], {
            raw: [""],
          }) as TemplateStringsArray;

          if (!strings) {
            return {
              tag,
              attributes: attributes(mergedProps),
              children: [],
              css,
              isTemplate: true,
              str: emptyTemplate,
              args: [],
              rootClass: className,
            };
          }

          // Получаем текст из strings
          const text = strings.join("");
          const allChildren = text ? [text, ...children] : children;

          const processedChildren = allChildren.map((child) =>
            child === null || child === undefined
              ? ""
              : typeof child === "string" ||
                (typeof child === "object" && "isTemplate" in child)
              ? child
              : String(child)
          );

          return {
            tag,
            attributes: attributes(mergedProps),
            children: processedChildren,
            css,
            isTemplate: true,
            str: emptyTemplate,
            args: [],
            rootClass: className,
          };
        };

        return Object.assign(factory, factory());
      }) as unknown as StyledComponent<T>,
      {
        className,
        displayName: `styled.${tag}`,
      }
    );

    return styledComponent;
  };
}

/**
 * Process style template and interpolations
 */
function processStyles(
  strings: TemplateStringsArray,
  values: StyleInterpolation[],
  className: string
): string {
  // Process interpolations
  let css = strings
    .reduce((result, str, i) => {
      const value = values[i];
      if (!value) return result + str;

      // Handle functions
      if (typeof value === "function") {
        return result + str + `.${value().rootClass}`;
      }

      // Handle nested styles
      if (typeof value === "object" && "css" in value) {
        return result + str + value.css;
      }

      return result + str + String(value);
    }, "")
    .trim();

  // Process selectors
  css = css
    // Replace & with class name
    .replace(/&\s*{/g, `.${className} {`)
    // Handle nested selectors
    .replace(/&\s*(\${|\.)/g, `.${className} $1`)
    // Handle direct class selectors
    .replace(/&\s+\./g, `.${className} .`);

  return css;
}

// Create styled API with element methods
const styledElements = Object.entries(elements).reduce(
  (acc, [key, element]) => ({
    ...acc,
    [key]: createStyled(element as ElementFactory<HTMLAttributes>),
  }),
  {}
) as StyledAPI;

// Export combined API
export const styled = Object.assign(
  <T extends HTMLAttributes>(
    component: ReturnType<typeof createElementFactory<T>> | StyledComponent<T>
  ): StyledFactory<T> => createStyled(component),
  styledElements
) as StyledAPI;

export default styled;

// Export CSS helpers
export { css, cssVar, keyframes } from "./css.ts";
