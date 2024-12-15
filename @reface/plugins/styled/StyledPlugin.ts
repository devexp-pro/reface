import { REFACE_EVENT } from "@reface/constants";
import type { IRefaceComposerPlugin } from "@reface/types";
import type { IStyledComponent } from "./types.ts";

export class StyledPlugin implements IRefaceComposerPlugin {
  name = "styled";
  private collectedStyles = new Set<string>();

  setup: IRefaceComposerPlugin["setup"] = (composer) => {
    const manager = composer.getRenderManager();

    manager.on(REFACE_EVENT.RENDER.RENDER.START, () => {
      this.collectedStyles.clear();
    });

    manager.on(REFACE_EVENT.RENDER.TEMPLATE.START, ({ template }) => {
      const styledComponent = template as Partial<IStyledComponent>;
      if (styledComponent.payload?.styled?.styles) {
        this.collectedStyles.add(styledComponent.payload.styled.styles);
      }
    });

    // Добавляем собранные стили в конец документа
    manager.on(REFACE_EVENT.RENDER.RENDER.END, ({ html }) => {
      if (this.collectedStyles.size === 0) return html;

      const styles = Array.from(this.collectedStyles).join("\n");
      return `${html}<style>\n${styles}\n</style>`;
    });
  };
}
