import type { ITemplate } from "./types.ts";
import type { IRenderManager } from "../render/types.ts";
import { escapeHTML } from "../utils/mod.ts";

/**
 * Represents text content that needs to be escaped for safe HTML rendering.
 * Handles HTML escaping and caches the result.
 *
 * @implements {ITemplate}
 *
 * @example
 * // Safe text content
 * new TemplateText('User input: <script>');
 * // Renders as: User input: &lt;script&gt;
 *
 * // Used in template literals
 * html`<div>${userInput}</div>`;
 */
export class TemplateText implements ITemplate {
  private escaped: string | null = null;
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  toHtml(_manager: IRenderManager): string {
    if (this.escaped === null) {
      this.escaped = escapeHTML(this.content);
    }
    return this.escaped;
  }
}
