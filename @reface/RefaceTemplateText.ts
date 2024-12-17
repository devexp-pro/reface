import { escapeHTML } from "./utils/mod.ts";
import { RefaceTemplate } from "./RefaceTemplate.ts";
export class RefaceTemplateText extends RefaceTemplate {
  static readonly type = "text";

  public override toHtml(): string {
    return escapeHTML(this.children.join(""));
  }
}
