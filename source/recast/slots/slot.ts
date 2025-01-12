import type { HTMLAttributes } from "@recast/expressions";
import { component } from "@recast/component";

import type {
  SlotAttributes,
  SlotComponent,
  SlotMeta,
  SlotMethods,
} from "./types.ts";

export function createSlot(
  name: string,
  render?: (content: string[]) => string,
): SlotComponent {
  return component<SlotAttributes & HTMLAttributes, SlotMethods>(
    () => {
      return "";
    },
    {
      meta: {
        slot: {
          name,
          render,
        },
      } as SlotMeta,
      methods: {
        getSlot() {
          return name;
        },
      },
    },
  );
}
