import { RecastPlugin, type RecastPluginInterface } from "@recast/plugin";
import {
  elementExpression,
  type ElementNode,
  PROXY_PAYLOAD,
} from "@recast/expressions";
import { SLOT_TEMPLATE_NAME } from "./constants.ts";

export class SlotsPlugin extends RecastPlugin implements RecastPluginInterface {
  name = "slots";
  private slots = new Map<string, Map<string, string>>();

  renderBefore() {
    this.slots.clear();
  }

  setup() {
    this.after<ElementNode<any, any>, typeof elementExpression>(
      elementExpression,
      ({ template, html }) => {
        const { tag, meta, attributes } = template[PROXY_PAYLOAD];

        if (tag === SLOT_TEMPLATE_NAME) {
          const name = meta?.slot?.name;
          if (!name) return html;

          return `<!--recast-slot-${name}-->`;
        }

        if (tag === "template" && attributes?.slot) {
          const slot = attributes.slot;
          const key = attributes.key ?? "default";

          if (!this.slots.has(slot)) {
            this.slots.set(slot, new Map());
          }

          this.slots.get(slot)?.set(
            key,
            html.replace(/<template[^>]*>(.*)<\/template>/g, "$1"),
          );
          return "";
        }

        return html;
      },
    );
  }

  renderAfter(_: undefined, html: string) {
    return html.replace(
      /<!--recast-slot-([\w.]+)-->/g,
      (_: string, name: string) =>
        this.slots.get(name)?.values().toArray()?.join("\n") ?? "",
    );
  }
}
