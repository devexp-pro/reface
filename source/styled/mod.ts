import type { Template } from "../types.ts";
import type { Attributes } from "../types/mod.ts";
import type { ElementChild } from "../types/base.ts";
import type {
  StyledComponent,
  StyleFunction,
  StyleInterpolation,
} from "./types.ts";
import { createElementFactory } from "../elements/createElementFactory.ts";
import { generateClassName } from "../helpers/mod.ts";
import * as elements from "../elements/mod.ts";

/**
 * Creates a styled component factory
 */
function createStyled<T extends Attributes>(
  elementFactory: ReturnType<typeof createElementFactory<T>>
) {
  return (strings: TemplateStringsArray, ...values: StyleInterpolation[]) => {
    // Generate unique class for component
    const className = generateClassName();
    const tag = elementFactory.name.toLowerCase();

    // Process CSS template
    const css = processStyles(strings, values, className);

    // Create styled component
    const styledComponent = ((props: T = {} as T) => {
      // Merge classes
      const existingClass = props.class || "";
      const mergedProps = {
        ...props,
        class: `${className} ${existingClass}`.trim(),
      };

      // Create base template
      const baseTemplate = elementFactory(mergedProps)(
        Object.assign([""], { raw: [""] }) as TemplateStringsArray
      );

      // Create styled template
      const template: Template = {
        ...baseTemplate,
        css,
        rootClass: className,
      };

      // Add template function
      return Object.assign(
        (strings?: TemplateStringsArray, ...values: ElementChild[]) => {
          if (!strings) return template;
          return {
            ...elementFactory(mergedProps)(strings, ...values),
            css,
            rootClass: className,
          };
        },
        template
      );
    }) as StyledComponent<T>;

    // Add metadata
    styledComponent.className = className;
    styledComponent.displayName = `styled.${tag}`;

    return styledComponent;
  };
}

/**
 * Processes style template and interpolations
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

      // Handle style functions
      if (typeof value === "function") {
        return result + str + `.${(value as StyleFunction)().rootClass}`;
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

/**
 * Base styled function for extending components
 */
export function styled<T extends Attributes>(
  component: ReturnType<typeof createElementFactory<T>> | StyledComponent<T>
) {
  return createStyled(component);
}

// Create styled API with element methods
type StyledElements = {
  [K in keyof typeof elements]: ReturnType<typeof createStyled<any>>;
};

const styledElements = Object.entries(elements).reduce(
  (acc, [key, element]) => ({
    ...acc,
    [key]: createStyled(element),
  }),
  {}
) as StyledElements;

// Export combined API
export const styledApi = Object.assign(styled, styledElements);
export default styledApi;

// Export CSS helper
export { css } from "./css.ts";
