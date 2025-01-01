import { REFACE_EVENT } from "@reface/constants";
import type { IRefaceComposerPlugin } from "@reface/recast";
import type { SlotComponent, TemplateComponent } from "./types.ts";

export class SlotsPlugin implements IRefaceComposerPlugin {
  name = "slots";
  private slots = new Map<string | symbol, Set<JSX.Element>>();

  setup: IRefaceComposerPlugin["setup"] = (composer) => {
    const manager = composer.getRenderManager();

    // Очищаем слоты в начале рендера
    manager.on(REFACE_EVENT.RENDER.RENDER.START, () => {
      this.slots.clear();
    });

    // Собираем контент из Template компонентов
    manager.on(REFACE_EVENT.RENDER.TEMPLATE.START, ({ template }) => {
      const templateComponent = template as TemplateComponent;
      if (templateComponent.raw.type === "template") {
        const { slot, content, scope, priority } =
          templateComponent.raw.payload.template;

        if (!this.slots.has(slot)) {
          this.slots.set(slot, new Set());
        }

        this.slots.get(slot)?.add(content);
      }
    });

    // Заменяем Slot компоненты на их контент
    manager.on(REFACE_EVENT.RENDER.TEMPLATE.END, ({ template, result }) => {
      const slotComponent = template as SlotComponent;
      if (slotComponent.raw.type === "slot") {
        const { name, strategy } = slotComponent.raw.payload.slot;
        const contents = this.slots.get(name);

        if (!contents) return result;

        switch (strategy) {
          case "replace":
            return Array.from(contents).pop();
          case "merge":
            return Array.from(contents).join("");
          case "append":
          default:
            return Array.from(contents);
        }
      }

      return result;
    });
  };
}
