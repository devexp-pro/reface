import type { ElementChildType, IHTMLAttributes } from "./types.ts";
import type { ITemplateBase } from "./ITemplateBase.ts";
import type { RenderContext } from "./context.ts";
import { TemplateText } from "./TemplateText.ts";
import { formatTemplate } from "./utils/format.ts";

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

  abstract toHtml(context: RenderContext): string;

  private formatForInspect() {
    return {
      type: this.constructor.name,
      tag: this.tag,
      attributes: this.attributes,
      children: this.children,
      ...(this.css ? { css: "..." } : {}),
      ...(this.rootClass ? { rootClass: this.rootClass } : {}),
      ...(this.script ? { script: "..." } : {}),
      ...(this.scriptFile ? { scriptFile: this.scriptFile } : {}),
    };
  }

  [Symbol.for("Deno.customInspect")](): string {
    return formatTemplate(this);
  }

  [Symbol.for("nodejs.util.inspect.custom")](): string {
    return formatTemplate(this);
  }

  toJSON() {
    return this.formatForInspect();
  }
}
