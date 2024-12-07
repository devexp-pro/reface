import type {
  ElementChild,
  ElementFactory,
  HTMLAttributes,
  Template,
} from "../core/mod.ts";
import { generateClassName, processStyles, attributes } from "../html/mod.ts";
import * as elements from "./base.ts";

/**
 * Creates a styled component
 */
function createStyled<T extends HTMLAttributes>(
  elementFactory: ElementFactory<T>
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

          // Get text from strings
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

// Create styled API
const styledElements = Object.entries(elements).reduce(
  (acc, [key, element]) => ({
    ...acc,
    [key]: createStyled(element),
  }),
  {}
) as StyledAPI;

// Export combined API
export const styled = Object.assign(
  <T extends HTMLAttributes>(
    component: ElementFactory<T> | StyledComponent<T>
  ): StyledFactory<T> => createStyled(component),
  styledElements
) as StyledAPI;

export { css, cssVar, keyframes } from "./css.ts";
