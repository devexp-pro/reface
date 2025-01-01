import { REFACE_EVENT } from "@reface/recast";
import type { IRefaceComposerPlugin } from "@reface/recast";
import { isTemplate } from "../template/utils.ts";
import type { SlotComponent, TemplateComponent } from "./types.ts";

export class SlotsPlugin implements IRefaceComposerPlugin {
  name = "slots";
  private slots = new Map<string | symbol, Set<JSX.Element>>();

  private collectTemplates(template: TemplateComponent) {
    if (template.raw.type === "template") {
      const { children, scope, priority } = template.raw.payload.template;
      console.log(template.raw);
      const slot = template.raw.attributes.slot;

      if (!this.slots.has(slot.name)) {
        this.slots.set(slot.name, new Set());
      }

      this.slots.get(slot.name)?.add(children);
    }

    if (template.raw.children) {
      template.raw.children.forEach((child) => {
        if (isTemplate(child)) {
          this.collectTemplates(child as TemplateComponent);
        }
      });
    }
  }

  setup: IRefaceComposerPlugin["setup"] = (composer) => {
    const manager = composer.getRenderManager();

    manager.on(REFACE_EVENT.RENDER.RENDER.START, ({ template }) => {
      this.slots.clear();
      this.collectTemplates(template as TemplateComponent);
      console.log(this.slots);
    });

    manager.on(REFACE_EVENT.RENDER.TEMPLATE.START, ({ template }) => {
      const slotComponent = template as SlotComponent;
      if (slotComponent.raw.type === "slot") {
        const { name, strategy } = slotComponent.raw.payload.slot;
        const contents = this.slots.get(name);

        console.log("```", name, this.slots.get(name));

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
