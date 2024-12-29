import { elementExpression } from "@recast/expressions";
import { hx } from "../htmx/mod.ts";
import type { MetaPartial, PartialHandler, PartialTemplate } from "./types.ts";

export function createPartial<T = unknown>(
  name: string,
  handler: PartialHandler<T>,
  apiPrefix: string = "/reface/partial",
): PartialTemplate {
  const meta: MetaPartial = {
    name,
    handler,
    apiPrefix,
  };

  return elementExpression.create({
    tag: "div",
    attributes: {
      "data-partial": name,
    },
    children: [],
    meta: {
      partial: meta,
    },
    methods: {
      async execute(): Promise<T> {
        return this.meta?.partial?.handler({});
      },
      trigger(): Record<string, string> {
        const meta = this.meta?.partial;
        if (!meta) return {};

        return hx()
          .get(`${meta.apiPrefix}/${meta.name}`)
          .target(`[data-partial='${meta.name}']`)
          .trigger("click");
      },
    },
  });
}

export function partial<T = unknown>(
  handler: PartialHandler<T>,
  name: string,
): PartialTemplate {
  return createPartial(name, handler);
}
