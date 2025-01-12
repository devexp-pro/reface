import { RecastPlugin, type RecastPluginInterface } from "@recast/plugin";
import { componentExpression, type ComponentNode } from "@recast/expressions";

export class SlotsPlugin extends RecastPlugin implements RecastPluginInterface {
  name = "slots";
  private slots = new Map<string, Map<string, string>>();
  private slotsFn = new Map<string, (content: string[]) => string>();

  renderBefore() {
    this.slots.clear();
  }

  setup() {
    this.after<ComponentNode<any, any>, typeof componentExpression>(
      componentExpression,
      ({ template, html }) => {
        const { meta, attributes } = componentExpression.getPayload(template);

        if (meta?.slot?.name) {
          const name = meta.slot.name;
          if (meta.slot?.render) {
            this.slotsFn.set(name, meta.slot.render);
          }
          return `<!--recast-slot-${name}-->`;
        }

        if (meta?.template === true) {
          const slot = attributes.slot;
          const key = attributes.key ?? "default";

          if (!this.slots.has(slot)) {
            this.slots.set(slot, new Map());
          }

          this.slots.get(slot)?.set(key, html);
          return "";
        }

        return html;
      },
    );
  }

  renderAfter(_: undefined, html: string) {
    return html.replace(
      /<!--recast-slot-([\w.]+)-->/g,
      (_: string, name: string) => {
        const fn = this.slotsFn.get(name);
        const values = this.slots.get(name)?.values().toArray() ?? [];
        if (fn) {
          return fn(values);
        }
        return values.join("\n");
      },
    );
  }
}
