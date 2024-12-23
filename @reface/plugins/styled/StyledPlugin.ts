import { REFACE_EVENT } from "@reface/constants";
import type { IRefaceComposerPlugin } from "@reface/types";
import type { StyledPayload } from "./types.ts";
import type { Template } from "@reface/template";

export class StyledPlugin implements IRefaceComposerPlugin {
  name = "styled";
  private collectedStyles = new Set<string>();

  setup: IRefaceComposerPlugin["setup"] = (composer) => {
    const manager = composer.getRenderManager();

    // Очищаем стили перед каждым рендерингом
    manager.on(REFACE_EVENT.RENDER.RENDER.START, () => {
      this.collectedStyles.clear();
    });

    // Собираем стили из шаблонов
    manager.on(REFACE_EVENT.RENDER.TEMPLATE.START, ({ template }) => {
      const styledTemplate = template as Template<any, StyledPayload>;
      if (styledTemplate.raw.type === "styled") {
        this.collectedStyles.add(styledTemplate.raw.payload.styled.styles);
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
