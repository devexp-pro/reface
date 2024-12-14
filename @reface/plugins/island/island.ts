import type { ElementChildType } from "../../core/types.ts";
import { TemplateIsland } from "./TemplateIsland.ts";
import type { IslandFn } from "./types.ts";
import { hx, type HxBuilder, type HxTrigger } from "@reface/htmx";

export interface IslandAPI<T> {
  (props?: Record<string, unknown>, children?: ElementChildType[]):
    | TemplateIsland<T>
    | ((
      strings?: TemplateStringsArray,
      ...values: ElementChildType[]
    ) => TemplateIsland<T>);
  trigger: (trigger?: HxTrigger) => HxBuilder;
}

export const island: IslandFn<any> = (handler, name) => {
  const islandFn =
    ((props: Record<string, unknown> = {}, children?: ElementChildType[]) => {
      if (children) {
        // Прямой вызов с children
        return new TemplateIsland({
          name,
          handler,
          attributes: props,
          children,
        });
      }

      // Возвращаем функцию для template literals
      return (
        strings: TemplateStringsArray = [],
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

        return new TemplateIsland({
          name,
          handler,
          attributes: props,
          children: templateChildren,
        });
      };
    }) as IslandAPI<typeof handler>;

  // Добавляем API для триггеров
  islandFn.trigger = (trigger?: HxTrigger) => {
    return hx()
      .get(`/reface-island/${name}`)
      .target(`[data-island='${name}']`)
      .trigger(trigger || "click");
  };

  return islandFn;
};
