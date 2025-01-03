import { isTemplate, REFACE_EVENT } from "@reface/recast";
import type { IRefaceComposerPlugin } from "@reface/recast";
import type { SlotComponent, TemplateComponent } from "./types.ts";
import { SLOT_TEMPLATE_NAME, TEMPLATE_TEMPLATE_NAME } from "./constants.ts";
import { $, Traverser } from "../query/mod.ts";

export class SlotsPlugin implements IRefaceComposerPlugin {
  name = "slots";
  private slots = new Map<string | symbol, Map<string, Set<JSX.Element>>>();
  private traverser = new Traverser();

  private collectTemplates(template: TemplateComponent) {
    // Ищем все Template компоненты
    const templates = this.traverser.find(
      template,
      $()
        .type(TEMPLATE_TEMPLATE_NAME),
    );

    // Обрабатываем найденные шаблоны
    templates.forEach((template) => {
      const { children } = template.raw.payload.template;
      const slot = template.raw.attributes.slot;
      const key = template.raw.attributes.key ?? "default";
      const rcc = template.raw.attributes.__rcc;

      if (!this.slots.has(slot)) {
        this.slots.set(slot, new Map());
      }

      if (!this.slots.get(slot)?.has(key)) {
        if (isTemplate(children[0])) {
          children[0].raw.attributes["data-component"] = rcc;
        }

        this.slots.get(slot)?.set(key, children);
      }
    });
  }

  setup: IRefaceComposerPlugin["setup"] = (composer) => {
    const manager = composer.getRenderManager();

    manager.on(REFACE_EVENT.RENDER.RENDER.START, ({ template }) => {
      this.slots.clear();
      this.collectTemplates(template as TemplateComponent);
    });

    manager.on(REFACE_EVENT.RENDER.TEMPLATE.START, ({ template }) => {
      // Проверяем является ли компонент слотом
      const isSlot = this.traverser.matches(
        template as TemplateComponent,
        $()
          .type(SLOT_TEMPLATE_NAME),
      );

      if (isSlot) {
        const slotComponent = template as SlotComponent;
        const { name } = slotComponent.raw.payload.slot;
        const contents = this.slots.get(name);

        if (!contents) return template;

        const slotChildren = [...contents.values()].flat();
        return template`${slotChildren}`;
      }

      return template;
    });
  };
}
