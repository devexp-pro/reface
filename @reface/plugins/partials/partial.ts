// @reface/plugins/partials/partial.ts
import { getChildren } from "../../utils/getChildren.ts";
import { TemplatePartial } from "./TemplatePartial.ts";
import type { PartialComponent, PartialFn, PartialHandler } from "./types.ts";
import { hx } from "@reface/htmx";

function createPartial<T>(
  handler: PartialHandler<T>,
  name: string,
): PartialComponent<T> {
  const partialComponent = ((props = {}) => {
    return (strings = Object.assign([], { raw: [] }), ...values) => {
      return new TemplatePartial({
        name,
        handler,
        attributes: props,
        children: getChildren(strings, values),
      });
    };
  }) as PartialComponent<T>;

  // Добавляем API для триггеров
  partialComponent.trigger = (trigger) => {
    return hx()
      .get(`/reface-partial/${name}`)
      .target(`[data-partial='${name}']`)
      .trigger(trigger || "click");
  };

  return partialComponent;
}

export const partial: PartialFn = (handler, name) => {
  return createPartial(handler, name);
};
