import { createLogger } from "@reface/core";
import type { ElementChildType, ITemplate } from "./types.ts";
import { RenderContext } from "./context.ts";
import { escapeHTML } from "./escape.ts";
import { renderAttributes } from "./attributes.ts";

const logger = createLogger("HTML:Html");

export class TemplateHtml implements ITemplate {
  constructor(public readonly children: ElementChildType[]) {
    logger.debug("Creating HTML template", {
      childrenCount: children.length,
    });
  }

  toHtml(context: RenderContext): string {
    context.depth++;
    logger.debug("Rendering HTML template", {
      depth: context.depth,
      childrenCount: this.children.length,
    });

    const result = this.children
      .map((child) => this.renderNode(child, context))
      .join("\n");

    context.depth--;
    return result;
  }

  private renderNode(node: unknown, context: RenderContext): string {
    // Если массив, рекурсивно обрабатываем каждый элемент
    if (Array.isArray(node)) {
      return node.map((item) => this.renderNode(item, context)).join("\n");
    }

    // Если HTML элемент
    if (node && typeof node === "object") {
      if ("toHtml" in node) {
        return node.toHtml(context);
      }
      if ("tag" in node) {
        const { tag, props, children } = node;
        const attrs = props ? renderAttributes(props) : "";
        const content = this.renderNode(children, context);
        return `<${tag}${attrs}>\n${content}\n</${tag}>`;
      }

      // Если текстовый узел
      if ("content" in node) {
        return node.trusted ? node.content : escapeHTML(node.content);
      }
    }

    // Если примитив
    return escapeHTML(String(node));
  }
}
