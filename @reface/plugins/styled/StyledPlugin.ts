import { REFACE_EVENT } from "../../core/constants.ts";
import type { IPlugin } from "../../core/types.ts";
import type { StyledComponent } from "./types.ts";

export class StyledPlugin implements IPlugin {
  name = "styled";
  private collectedStyles = new Set<string>();

  setup(reface) {
    const manager = reface.getRenderManager();

    manager.on(REFACE_EVENT.RENDER.RENDER.START, () => {
      this.collectedStyles.clear();
    });

    manager.on(REFACE_EVENT.RENDER.TEMPLATE.START, ({ template }) => {
      const styledComponent = template as Partial<StyledComponent>;
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
  }
}
