import { RenderContextManager } from "./context.ts";
import type { Template } from "./Template.ts";

export interface RenderResultType {
  html: string;
  styles: string;
  islands: Map<string, () => Template>;
}

export function render(
  template: Template,
  separated: boolean = false,
): string | RenderResultType {
  const context = RenderContextManager.createContext();

  try {
    const html = template.toHtml(context);
    const styles = Array.from(context.styles).join("\n");
    const islands = context.islands;

    if (separated) {
      return {
        html,
        styles,
        islands,
      };
    }

    return styles ? `${html}\n<style>\n${styles}\n</style>` : html;
  } finally {
    RenderContextManager.reset();
  }
}
