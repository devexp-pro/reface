import { TemplatePartial } from "./TemplatePartial.ts";
import type { PartialComponent, PartialFn, PartialHandler } from "./types.ts";

function createPartial<T>(
  handler: PartialHandler<T>,
  name: string,
): PartialComponent<T> {
  return new TemplatePartial({
    tag: "div",
    attributes: {
      "data-partial": name,
    },
    payload: {
      partial: {
        name,
        handler,
      },
    },
  });
}

export const partial: PartialFn = (handler, name) => {
  return createPartial(handler, name);
};
