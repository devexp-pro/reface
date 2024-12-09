import type { ElementChildType, IHTMLAttributes } from "./types.ts";

/**
 * Base template interface
 */
export interface ITemplateBase<P extends IHTMLAttributes = IHTMLAttributes> {
  readonly tag: string;
  readonly attributes: P;
  readonly children: ElementChildType[];
  readonly css: string;
  readonly rootClass: string;
  readonly script?: string;
  readonly scriptFile?: string;
}
