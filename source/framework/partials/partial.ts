import {
  elementExpression,
  type ElementNode,
  type HTMLAttributes,
} from "@recast/expressions";
import { hx, type HxBuilder } from "../htmx/mod.ts";
import type { MetaPartial, PartialMethods } from "./types.ts";

export function createPartial<T = unknown>(
  name: string,
  handler: any,
  apiPrefix: string = "/reface/partial",
): ElementNode<HTMLAttributes, PartialMethods> {
  const meta: MetaPartial = {
    name,
    handler,
    apiPrefix,
  };

  return elementExpression.create<PartialMethods>({
    tag: "div",
    attributes: {
      "data-partial": name,
    },
    children: [],
    meta: {
      partial: meta,
    },
    methods: {
      trigger(this: ElementNode<HTMLAttributes, PartialMethods>): HxBuilder {
        const payload = elementExpression.getPayload(this);
        const meta = payload.meta?.partial as MetaPartial | undefined;
        if (!meta) {
          throw new Error("Partial meta not found");
        }
        return hx()
          .get(`${meta.apiPrefix}/${meta.name}`)
          .target(`[data-partial='${meta.name}']`)
          .trigger("click");
      },
    },
  });
}

export function partial<T = unknown>(
  handler: any,
  name: string,
): ElementNode<HTMLAttributes, PartialMethods> {
  return createPartial(name, handler);
}
