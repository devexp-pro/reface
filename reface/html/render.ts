import { createLogger } from "@reface/core";
import type { ElementChild } from "./types.ts";

const logger = createLogger("HTML:Render");

export class RenderContext {
  private styles: Set<string> = new Set();
  private rootClasses: Set<string> = new Set();

  addStyle(css: string, rootClass: string) {
    if (this.rootClasses.has(rootClass)) {
      return;
    }
    this.styles.add(css.replace(/&/g, `.${rootClass}`));
    this.rootClasses.add(rootClass);
  }

  getStyles(): string {
    if (this.styles.size === 0) {
      return "";
    }
    return `\n<style>\n${Array.from(this.styles).join("\n")}\n</style>`;
  }
}

export function render(template: ElementChild): string {
  logger.debug("Rendering template", { type: template?.constructor?.name });

  const context = new RenderContext();
  const html = renderWithContext(template, context);

  return html + context.getStyles();
}

function renderWithContext(
  template: ElementChild,
  context: RenderContext,
): string {
  if (
    template && typeof template === "object" && "css" in template &&
    "rootClass" in template && typeof template.css === "string"
  ) {
    context.addStyle(template.css, template.rootClass);
  }

  return "toHtml" in template ? template.toHtml(context) : String(template);
}
