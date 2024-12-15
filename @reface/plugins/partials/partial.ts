import type { ElementChildType } from "@reface/types";
import { TemplatePartial } from "./TemplatePartial.ts";
import type { PartialFn } from "./types.ts";
import { hx, type HxBuilder, type HxTrigger } from "@reface/htmx";

export interface PartialAPI<T> {
  (props?: Record<string, unknown>, children?: ElementChildType[]):
    | TemplatePartial<T>
    | ((
      strings?: TemplateStringsArray,
      ...values: ElementChildType[]
    ) => TemplatePartial<T>);
  trigger: (trigger?: HxTrigger) => HxBuilder;
}

export const partial: PartialFn<any> = (handler, name) => {
  const partialFn =
    ((props: Record<string, unknown> = {}, children?: ElementChildType[]) => {
      if (children) {
        // Прямой вызов с children
        return new TemplatePartial({
          name,
          handler,
          attributes: props,
          children,
        });
      }

      // Возвращаем функцию для template literals
      return (
        strings: TemplateStringsArray = Object.assign([], { raw: [] }),
        ...values: ElementChildType[]
      ) => {
        const templateChildren = [];
        for (let i = 0; i < strings.length; i++) {
          if (strings[i].trim()) {
            templateChildren.push(strings[i]);
          }
          if (i < values.length) {
            templateChildren.push(values[i]);
          }
        }

        return new TemplatePartial({
          name,
          handler,
          attributes: props,
          children: templateChildren,
        });
      };
    }) as PartialAPI<typeof handler>;

  // Добавляем API для триггеров
  partialFn.trigger = (trigger?: HxTrigger) => {
    return hx()
      .get(`/reface-partial/${name}`)
      .target(`[data-partial='${name}']`)
      .trigger(trigger || "click");
  };

  return partialFn;
};
