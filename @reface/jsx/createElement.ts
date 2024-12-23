import {
  type ElementChildType,
  REFACE_TEMPLATE,
  type Template,
  type TemplateAttributes,
} from "@reface/template";
import { createTemplateFactory } from "../template/createTemplateFactory.ts";

// Добавляем типы для компонентов из template/types
type ComponentProps = TemplateAttributes;
type ComponentWithProps = {
  (props: ComponentProps): Template;
  type?: string;
};

const jsxTemplate = createTemplateFactory({
  type: "jsx",
  create: {
    defaults: {
      attributes: {} as TemplateAttributes,
    },
  },
});

export function createElement<P extends ComponentProps = ComponentProps>(
  type: string | ComponentWithProps,
  props: P | null,
  ...children: ElementChildType[]
): Template {
  if (typeof type === "function" && type[REFACE_TEMPLATE] === true) {
    return type(props ?? {})`${children}`;
  }
  if (typeof type === "function") {
    return type(props ?? {}, children);
  }

  return jsxTemplate({
    tag: type,
    attributes: props ?? {},
    children,
  });
}
