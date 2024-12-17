import type {
  ComponentProps,
  ComponentWithProps,
  ElementChildType,
  IRefaceTemplate,
} from "@reface/types";
import { RefaceTemplateElement } from "@reface";
import { RefaceTemplate } from "../RefaceTemplate.ts";

export function createElement<P extends ComponentProps = ComponentProps>(
  type: string | ComponentWithProps,
  props: P | null,
  ...children: ElementChildType[]
): IRefaceTemplate {
  if (typeof type === "function" && type.type) {
    return type(props ?? {})`${children}`;
  }
  if (typeof type === "function") {
    return type(props ?? {}, children);
  }

  // Для HTML элементов
  return new RefaceTemplateElement({
    tag: type,
    attributes: props ?? {},
    children,
  });
}
