import type { ElementChildType, IHTMLAttributes } from "./types.ts";
import type { ITemplateBase } from "./ITemplateBase.ts";

/**
 * Base template class
 */
export abstract class TemplateBase<P extends IHTMLAttributes = IHTMLAttributes>
  implements ITemplateBase<P> {
  readonly tag: string;
  readonly attributes: P;
  readonly children: ElementChildType[];
  readonly css: string;
  readonly rootClass: string;
  readonly script?: string;
  readonly scriptFile?: string;

  constructor({
    tag,
    attributes = {} as P,
    children = [],
    css = "",
    rootClass = "",
    script,
    scriptFile,
  }: {
    tag: string;
    attributes?: P;
    children?: ElementChildType[];
    css?: string;
    rootClass?: string;
    script?: string;
    scriptFile?: string;
  }) {
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
    this.css = css;
    this.rootClass = rootClass;
    this.script = script;
    this.scriptFile = scriptFile;
  }

  toString(): string {
    return this.children.join("");
  }
}
