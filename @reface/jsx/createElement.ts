import {
  type BaseAttributes,
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
  P extends BaseAttributes,
  T extends TemplatePayload = TemplatePayload,
>(
  type: string | ComponentFn<P, T> | Template<P, T>,
  props: P | null,
  ...children: ElementChildType[]
): Template<BaseAttributes, TemplatePayload> {
  if (isTemplate(type)) {
    return (type((props ?? {}) as P)`${children}`) as unknown as Template<
      BaseAttributes,
      TemplatePayload
    >;
  }
  if (isComponentFn<P, T>(type)) {
    return (type((props ?? {}) as P, children)) as unknown as Template<
      BaseAttributes,
      TemplatePayload
    >;
  }

  return jsxTemplate({
    tag: type,
    attributes: props ?? {},
    children,
  });
}
