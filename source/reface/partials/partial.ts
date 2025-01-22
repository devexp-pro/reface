import {
  component,
  type ComponentNode,
  element,
  HeadSlot,
  type HTMLAttributes,
  Template,
} from "@recast";
import { Reface } from "../Reface.ts";
import { hx, type HxBuilder } from "../htmx/mod.ts";
import type { MetaPartial, PartialHandler, PartialMethods } from "./types.ts";
import type { PartialsPlugin } from "./PartialsPlugin.ts";

export function createPartial<T = unknown>(
  name: string,
  handler: PartialHandler,
  apiPrefix: string = "/reface/partial",
) {
  const meta: MetaPartial = {
    name,
    handler,
    apiPrefix,
  };

  return component<HTMLAttributes, PartialMethods>(
    (props, children) => {
      Reface.reface.recast.getPlugin<PartialsPlugin>("partials")?.register(
        name,
        handler,
      );
      return element.div({
        ...props,
        "data-partial": meta.name,
      })`
      ${children}
      ${Template({ slot: HeadSlot.getSlot(), key: "htmx" })`
        ${element.script({ src: "https://unpkg.com/htmx.org@1.9.6" })}
      `}
      `;
    },
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
  handler: PartialHandler,
  name: string,
): ComponentNode<HTMLAttributes, PartialMethods> {
  return createPartial(name, handler);
}
