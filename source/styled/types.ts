import type { Template } from "../types.ts";
import type { ElementChild } from "../types/base.ts";

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
 * Styled component type
 */
export interface StyledComponent<Props = {}> {
  (props?: Props): Template & {
    (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  };
  className: string;
  displayName?: string;
}

/**
 * CSS helper function type
 */
export interface CSSHelper {
  (strings: TemplateStringsArray, ...values: StyleInterpolation[]): string;
  <Props>(
    strings: TemplateStringsArray,
    ...values: Array<StyleInterpolation | ((props: Props) => string | number)>
  ): (props: Props) => string;
}
