import type {
  HTMLAttributes,
  ElementFactory,
  Template,
  ElementChild,
} from "../types/base.ts";

/**
 * Style function that returns a template
 */
export type StyleFunction = () => Template;

/**
 * Style interpolation types
 */
export type StyleInterpolation =
  | string
  | number
  | StyleFunction
  | { css: string };

/**
 * Factory for creating styled components
 */
export type StyledFactory<T extends HTMLAttributes> = (
  strings: TemplateStringsArray,
  ...values: StyleInterpolation[]
) => StyledComponent<T>;

/**
 * Styled component type
 */
export interface StyledComponent<T extends HTMLAttributes>
  extends ElementFactory<T> {
  (props?: T): (
    strings: TemplateStringsArray,
    ...children: ElementChild[]
  ) => Template;
  (strings: TemplateStringsArray, ...children: ElementChild[]): Template;
  className: string;
  displayName?: string;
}

/**
 * Combined styled API type
 */
export interface StyledAPI {
  <T extends HTMLAttributes>(
    component: ElementFactory<T> | StyledComponent<T>
  ): StyledFactory<T>;
  [key: string]: StyledFactory<any>;
}
