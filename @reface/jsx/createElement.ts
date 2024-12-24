import {
  type ComponentFn,
  type ElementChildType,
  isComponentFn,
  isTemplate,
  type Template,
  type TemplateAttributes,
  type TemplatePayload,
} from "@reface/template";
import { createTemplateFactory } from "../template/createTemplateFactory.ts";

const jsxTemplate = createTemplateFactory({
  type: "jsx",
  create: {
    defaults: {
      attributes: {} as TemplateAttributes,
    },
  },
});

export function createElement<
  P extends TemplateAttributes = TemplateAttributes,
>(
  type: string | ComponentFn<P, TemplatePayload> | Template,
  props: P | null,
  ...children: ElementChildType[]
): Template {
  if (isTemplate(type)) {
    return type((props ?? {}) as P)`${children}`;
  }
  if (isComponentFn<P, TemplatePayload>(type)) {
    return type((props ?? {}) as P, children);
  }

  return jsxTemplate({
    tag: type,
    attributes: props ?? {},
    children,
  });
}
