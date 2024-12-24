import {
  createTemplateFactory,
  type ElementChildType,
  type Template,
  type TemplateAttributes,
  type TemplatePayload,
} from "@reface/template";

export type ComponentProps = TemplateAttributes;

export type ComponentRenderFn<
  P extends Record<string, any> = Record<string, any>,
> = (attrs: P, children: ElementChildType[]) => Template;

export const component = <
  P extends Record<string, any>,
  T extends TemplatePayload = TemplatePayload,
>(
  render: ComponentRenderFn<P>,
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
