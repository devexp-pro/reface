import { createLogger } from "@reface/core";
import type { ElementChildType } from "./types.ts";
import type { RenderContext } from "./context.ts";
import { ITemplate } from "./types.ts";
import { escapeHTML } from "./escape.ts";
import { TemplateText } from "./TemplateText.ts";

const logger = createLogger("HTML:Fragment");

/**
 * Fragment template - группирует элементы без создания родительского элемента
 */
export class TemplateFragment implements ITemplate {
  private readonly children: ElementChildType[];

  constructor(children: ElementChildType[] = []) {
    this.children = children.flat();
    logger.debug("Creating fragment", {
      childrenCount: this.children.length,
      childrenTypes: this.children.map((child) => child?.constructor?.name),
    });
  }

  private renderNode(node: unknown, context: RenderContext): string {
    // Если массив, рекурсивно обрабатываем каждый элемент
    if (Array.isArray(node)) {
      return node.map((item) => this.renderNode(item, context)).join("");
    }

    // Если HTML элемент
    if (node && typeof node === "object") {
      // Если компонент с toHtml
      if ("toHtml" in node) {
        return node.toHtml(context);
      }

      // Если HTML элемент
      if ("tag" in node) {
        const { tag, props, children } = node;
        const attrs = props ? renderAttributes(props) : "";
        const content = this.renderNode(children, context);
        return `<${tag}${attrs}>${content}</${tag}>`;
      }

      // Если текстовый узел
      if ("content" in node) {
        return node.trusted ? node.content : escapeHTML(node.content);
      }
    }

    // Если примитив
    return escapeHTML(String(node));
  }

  toHtml(context: RenderContext): string {
    context.depth++;
    logger.debug("Rendering fragment", {
      depth: context.depth,
      childrenCount: this.children.length,
    });

    const result = this.children
      .map((child) => this.renderNode(child, context))
      .join("");

    context.depth--;
    return result;
  }

  // Для отладки
  [Symbol.for("Deno.customInspect")](indent = "") {
    if (!this.children.length) return "<></> // [TemplateFragment]";

    const childIndent = `${indent}  `;
    const children = this.children
      .map((child) => {
        if (child === null || child === undefined) return "";
        if (typeof child === "string") {
          return child.length > 40
            ? `${childIndent}"${child.slice(0, 40)}..."`
            : `${childIndent}"${child}"`;
        }
        return `${childIndent}${child}`;
      })
      .filter(Boolean)
      .join("\n");

    return `<>\n${children}\n${indent}</> // [TemplateFragment]`;
  }

  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this[Symbol.for("Deno.customInspect")]();
  }

  toJSON() {
    return {
      type: "TemplateFragment",
      children: this.children,
    };
  }
}
