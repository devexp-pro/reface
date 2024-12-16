// @reface/jsx/Fragment.ts
import type {
  ComponentWithProps,
  ElementChildType,
  IRefaceTemplate,
} from "@reface/types";
import { RefaceTemplateFragment } from "@reface";

/**
 * JSX Fragment component for grouping elements without adding extra nodes.
 * Uses template literal syntax internally.
 *
 * @example
 * // JSX usage (transformed to template literal internally)
 * <>
 *   <div>First</div>
 *   <div>Second</div>
 * </>;
 *
 * // Direct template literal usage
 * Fragment()`
 *   ${div()`First`}
 *   ${div()`Second`}
 * `;
 */
export const Fragment: ComponentWithProps<IRefaceTemplate> = () => {
  return (
    strings = Object.assign([], { raw: [] }),
    ...values: ElementChildType[]
  ) => {
    return new RefaceTemplateFragment(values);
  };
};
