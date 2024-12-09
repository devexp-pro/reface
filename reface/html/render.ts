import type { ITemplate } from "./types.ts";

export function render(template: ITemplate): string {
  return template.toHtml();
}
