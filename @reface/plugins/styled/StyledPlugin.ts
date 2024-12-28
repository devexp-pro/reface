import { REFACE_EVENT } from "@reface/constants";
import type { IRefaceComposerPlugin } from "@reface/types";
import type { StyledPayload } from "./types.ts";
import type { Template } from "@reface/template";

export class StyledPlugin implements IRefaceComposerPlugin {
  name = "styled";
  private collectedStyles = new Set<string>();

  setup: IRefaceComposerPlugin["setup"] = (composer) => {
    const manager = composer.getRenderManager();
    manager.on(REFACE_EVENT.RENDER.RENDER.START, () => {
      this.collectedStyles.clear();
    });
    manager.on(REFACE_EVENT.RENDER.TEMPLATE.START, ({ template }) => {
      const styledTemplate = template as Template<any, StyledPayload>;
      if (styledTemplate.raw.type === "styled") {
        this.collectedStyles.add(styledTemplate.raw.payload.styled.styles);
      }
    });
    manager.on(REFACE_EVENT.RENDER.RENDER.END, ({ html = "" }) => {
      if (this.collectedStyles.size === 0) return html;

      const styles = Array.from(this.collectedStyles).join("\n");
      const styleTag = `<style>\n${styles}\n</style>`;
      if (html.includes("</head>")) {
        return html.replace("</head>", `${styleTag}</head>`);
      }
      return `${html}${styleTag}`;
    });
  };
}
