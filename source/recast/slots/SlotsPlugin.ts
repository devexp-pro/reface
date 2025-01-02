import { REFACE_EVENT } from "@reface/recast";
import type { IRefaceComposerPlugin } from "@reface/recast";
import { isTemplate } from "../template/utils.ts";
import type { SlotComponent, TemplateComponent } from "./types.ts";
import { SLOT_TEMPLATE_NAME, TEMPLATE_TEMPLATE_NAME } from "./constants.ts";
import { Fragment } from "../jsx/Fragment.ts";

export class SlotsPlugin implements IRefaceComposerPlugin {
  name = "slots";
  private slots = new Map<string | symbol, Map<string, Set<JSX.Element>>>();

  private collectTemplates(template: TemplateComponent) {
    if (!isTemplate(template)) return;

    if (template.raw.type === TEMPLATE_TEMPLATE_NAME) {
      const { children } = template.raw.payload.template;
      const slot = template.raw.attributes.slot;
      const key = template.raw.attributes.key ?? "default";

      if (!this.slots.has(slot)) {
        this.slots.set(slot, new Map());
      }

      if (!this.slots.get(slot)?.has(key)) {
        this.slots.get(slot)?.set(key, children);
        console.log("stored slot", slot, key, children[0].raw.attributes);
      }
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
      for (const [slotName, slot] of this.slots.entries()) {
        for (const [key, value] of slot.entries()) {
          console.log("slot", slotName, key);
          console.log("");
        }
      }
    });

    manager.on(REFACE_EVENT.RENDER.TEMPLATE.START, ({ template }) => {
      const slotComponent = template as SlotComponent;
      if (slotComponent.raw.type === SLOT_TEMPLATE_NAME) {
        const { name } = slotComponent.raw.payload.slot;
        const contents = this.slots.get(name);

        if (!contents) return template;

        const slotChildren = [...contents.values()].flat();
        console.log("slotChildren", name, contents.keys(), slotChildren);

        return template`${slotChildren}`;
      }

      return template;
    });
  };
}
