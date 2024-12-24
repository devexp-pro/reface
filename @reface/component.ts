import {
  type ComponentFn,
  createTemplateFactory,
  type Template,
  type TemplateAttributes,
  type TemplatePayload,
} from "@reface/template";

export type ComponentProps = TemplateAttributes;

export const component = <
  P extends Record<string, any>,
  T extends TemplatePayload = TemplatePayload,
>(
  render: ComponentFn<P, T>,
): Template<P, T> => {
  const componentTemplate = createTemplateFactory({
    type: "component",
    create: {
      defaults: {
        attributes: {} as P,
        payload: {} as T,
      },
    },
  });

  return componentTemplate(render) as Template<P, T>;
};
