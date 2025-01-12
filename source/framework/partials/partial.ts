import { Reface } from "../Reface/Reface.ts";
import {
  component,
  type ComponentNode,
  element,
  HeadSlot,
  Template,
} from "@recast";
import { hx, type HxBuilder } from "../htmx/mod.ts";
import type { MetaPartial, PartialMethods } from "./types.ts";
import type { PartialsPlugin } from "./PartialsPlugin.ts";
import type { ComponentRenderFn, HTMLAttributes } from "@recast/expressions";

export function createPartial<T = unknown>(
  name: string,
  handler: ComponentRenderFn<any>,
  apiPrefix: string = "/reface/partial",
) {
  const meta: MetaPartial = {
    name,
    handler,
    apiPrefix,
  };

  Reface.getReface().recast.getPlugin<PartialsPlugin>("partials")?.register(
    name,
    handler,
  );

  return component<HTMLAttributes, PartialMethods>(
    (props, children) => (
      element.div({
        ...props,
        "data-partial": meta.name,
      })`
      ${children}
      ${Template({ slot: HeadSlot.getSlot(), key: "htmx" })`
        ${element.script({ src: "https://unpkg.com/htmx.org@1.9.6" })}
      `}
      `
    ),
    {
      meta: {
        partial: meta,
      },
      methods: {
        trigger(): HxBuilder {
          return hx()
            .get(`${meta.apiPrefix}/${meta.name}`)
            .target(`[data-partial='${meta.name}']`)
            .trigger("click");
        },
      },
    },
  );
}

export function partial<T = unknown>(
  handler: ComponentRenderFn<any>,
  name: string,
): ComponentNode<HTMLAttributes, PartialMethods> {
  return createPartial(name, handler);
}
