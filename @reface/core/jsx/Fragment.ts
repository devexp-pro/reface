import type { ElementChildType, ITemplate } from "../templates/types.ts";
import { TemplateFragment } from "../templates/mod.ts";

/**
 * JSX Fragment component for grouping elements without adding extra nodes.
 *
 * @param _props - Unused props parameter
 * @param children - Child elements to render
 * @returns Fragment template
 *
 * @example
 * // JSX usage
 * <>
 *   <div>First</div>
 *   <div>Second</div>
 * </>;
 *
 * // Function usage
 * Fragment({}, [
 *   div()`First`,
 *   div()`Second`
 * ]);
 */
export function Fragment(
  _props: unknown,
  children: ElementChildType[],
): ITemplate {
  return new TemplateFragment(children);
}
