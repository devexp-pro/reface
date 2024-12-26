import {
  type BaseAttributes,
  type ComponentFn,
  type ElementChildType,
  isComponentFn,
  isTemplate,
  type Template,
  type TemplateAttributes,
  TemplateHtmlAttributes,
  TemplateMethods,
  type TemplatePayload,
} from "@reface/template";
import { createTemplateFactory } from "../template/createTemplateFactory.ts";

const jsxTemplate = createTemplateFactory<
  TemplateHtmlAttributes,
  TemplatePayload
>({
  type: "jsx",
  create: {
    defaults: {
      attributes: {} as TemplateAttributes,
    },
  },
});

export function createElement<
  P extends TemplateHtmlAttributes,
  T extends TemplatePayload = TemplatePayload,
>(
  type: string | ComponentFn<P> | Template<P, T>,
  props: P | null,
  ...children: ElementChildType[]
): Template<P, T> {
  if (isTemplate<P, T, any>(type)) {
    return (type((props ?? {}) as P)`${children}`);
  }
  if (isComponentFn<P>(type)) {
    return (type((props ?? {}) as P, children));
  }

  return jsxTemplate({
    tag: type,
    attributes: props ?? {},
    children,
  }) as unknown as Template<P, T>; // FIXME: find a way to remove unknown
}
