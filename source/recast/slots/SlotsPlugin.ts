import { REFACE_EVENT } from "@reface/recast";
import type { IRefaceComposerPlugin } from "@reface/recast";
import { isTemplate } from "../template/utils.ts";
import type { SlotComponent, TemplateComponent } from "./types.ts";
import { SLOT_TEMPLATE_NAME, TEMPLATE_TEMPLATE_NAME } from "./constants.ts";

export class SlotsPlugin implements IRefaceComposerPlugin {
  name = "slots";
  private slots = new Map<string | symbol, Set<JSX.Element>>();

  private collectTemplates(template: TemplateComponent) {
    if (!isTemplate(template)) return;

    if (template.raw.type === TEMPLATE_TEMPLATE_NAME) {
      const { children } = template.raw.payload.template;
      const slot = template.raw.attributes.slot;

      if (!this.slots.has(slot.name)) {
        this.slots.set(slot.name, new Set());
      }

      this.slots.get(slot.name)?.add(children);
    }

    if (template.raw.children) {
      template.raw.children.flat().forEach((child) => {
        this.collectTemplates(child as TemplateComponent);
      });
    }
  }

  setup: IRefaceComposerPlugin["setup"] = (composer) => {
    const manager = composer.getRenderManager();

    manager.on(REFACE_EVENT.RENDER.RENDER.START, ({ template }) => {
      this.slots.clear();
      this.collectTemplates(template as TemplateComponent);
    });

    manager.on(REFACE_EVENT.RENDER.TEMPLATE.START, ({ template }) => {
      const slotComponent = template as SlotComponent;
      if (slotComponent.raw.type === SLOT_TEMPLATE_NAME) {
        const { name, strategy } = slotComponent.raw.payload.slot;
        const contents = this.slots.get(name);

        if (!contents) return template;

        let slotChildren;
        switch (strategy) {
          case "replace":
            slotChildren = [Array.from(contents).pop()];
            break;
          case "merge":
            slotChildren = [Array.from(contents).join("")];
            break;
          case "append":
          default:
            slotChildren = Array.from(contents);
        }

        return template`${slotChildren}`;
      }

      return template;
    });
  };
}
