import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";
import { Template } from "./Template.ts";
import type { RenderContext } from "./render.ts";

const logger = createLogger("TemplateComponent");

export class TemplateComponent {
  constructor(
    private readonly tag: string,
    private readonly attributes: Record<string, unknown>,
    private readonly css?: string,
    private readonly rootClass?: string,
  ) {}

  template(
    strings: TemplateStringsArray | ElementChildType[],
    ...values: ElementChildType[]
  ): Template {
    logger.debug("Rendering template", {
      tag: this.tag,
      attributes: this.attributes,
      children: Array.isArray(strings) ? strings : [],
    });

    const children = Array.isArray(strings) ? strings : [];

    return new Template({
      tag: this.tag,
      attributes: this.attributes,
      children,
      css: this.css,
      rootClass: this.rootClass,
    });
  }

  toHtml(context: RenderContext): string {
    return this.template([]).toHtml(context);
  }
}
