import { createLogger } from "@reface/core";
import type { ElementChildType, ITemplate } from "./types.ts";
import type { RenderContext } from "./context.ts";
import { renderAttributes } from "./attributes.ts";
import { TemplateHtml } from "./TemplateHtml.ts";

const logger = createLogger("HTML:Component");

// Перемещаем VOID_ELEMENTS в HTML слой
const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

export class TemplateComponent implements ITemplate {
  constructor(
    public readonly tag: string,
    public readonly attributes: Record<string, unknown>,
    public readonly children: ElementChildType[],
    public readonly css?: string,
    public readonly rootClass?: string,
  ) {
    logger.debug("Creating template component", {
      tag,
      attributes,
      childrenCount: children.length,
      hasCSS: Boolean(css),
      rootClass,
    });
  }

  toHtml(context: RenderContext): string {
    context.depth++;
    logger.debug("Rendering template component", {
      depth: context.depth,
      tag: this.tag,
      rootClass: this.rootClass,
    });

    if (this.css) {
      context.styles.add(this.css);
      if (this.rootClass) {
        context.components.add(this.rootClass);
      }
    }

    const attrs = renderAttributes(this.attributes);
    const isVoidElement = VOID_ELEMENTS.has(this.tag);

    // Для void элементов не рендерим содержимое и используем самозакрывающийся тег
    if (isVoidElement) {
      context.depth--;
      return `<${this.tag}${attrs}/>\n`;
    }

    const result = new TemplateHtml([{
      tag: this.tag,
      props: this.attributes,
      children: this.children,
    }]).toHtml(context);

    context.depth--;
    return result;
  }
}
