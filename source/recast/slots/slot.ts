import {
  elementExpression,
  type ElementNode,
  type HTMLAttributes,
} from "@recast/expressions";
import type { SlotAttributes, SlotMethods } from "./types.ts";
import { SLOT_TEMPLATE_NAME } from "./constants.ts";

export function createSlot(
  name: string,
  render?: (content: string[]) => string,
): ElementNode<SlotAttributes & HTMLAttributes, SlotMethods> {
  // @ts-expect-error FIXME
  return elementExpression.create({
    tag: SLOT_TEMPLATE_NAME,
    meta: {
      slot: {
        name,
        render,
      },
    },
    methods: {
      getSlot() {
        return name;
      },
    },
  });
}
