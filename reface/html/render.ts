import { RenderContextManager } from "./context.ts";

export function render(template: Template): string {
  const context = RenderContextManager.createContext();

  try {
    const html = template.toHtml(context);
    const styles = Array.from(context.styles).join("\n");

    return styles ? `${html}\n<style>\n${styles}\n</style>` : html;
  } finally {
    RenderContextManager.reset();
  }
}
