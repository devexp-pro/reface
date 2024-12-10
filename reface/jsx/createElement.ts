import { createLogger } from "@reface/core";
import { type ElementChildType, TemplateComponent } from "@reface/html";
import type { ComponentFunction } from "./types.ts";

const logger = createLogger("JSX");

export function createElement<Props = object>(
  tag: string | ComponentFunction<Props>,
  props: Props | null,
  ...children: ElementChildType[]
): TemplateComponent {
  logger.debug("Creating element", {
    tag,
    props,
    childrenCount: children.length,
  });

  // Для функциональных компонентов
  if (typeof tag === "function") {
    // Всегда передаем props первым аргументом, children - вторым
    return tag(props ?? {} as Props, children);
  }

  return new TemplateComponent(tag, props ?? {}, children);
}
