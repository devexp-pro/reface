import type { ElementFactory, HTMLAttributes } from "../core/Template.ts";
import type { StyleInterpolation } from "../html/styles.ts";

/**
 * Styled component interface
 */
export interface StyledComponent<T> extends ElementFactory<T> {
  className: string;
  displayName?: string;
}

/**
 * Factory for creating styled components
 */
export type StyledFactory<T> = (
  strings: TemplateStringsArray,
  ...values: StyleInterpolation[]
) => StyledComponent<T>;

/**
 * Combined styled API type
 */
export interface StyledAPI {
  <T extends HTMLAttributes>(
    component: ElementFactory<T> | StyledComponent<T>
  ): StyledFactory<T>;
  [key: string]: StyledFactory<any>;
}
