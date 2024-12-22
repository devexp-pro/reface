import {
  type ComponentProps,
  type ComponentRenderFn,
  type ComponentWithProps,
  createTemplateFactory,
  type TemplatePayload,
} from "./template/mod.ts";

export const component = <
  P extends ComponentProps,
  T extends TemplatePayload = TemplatePayload,
>(
  render: ComponentRenderFn<P, T>,
): ComponentWithProps<P, T> => {
  const componentTemplate = createTemplateFactory({
    type: "component",
    create: {
      defaults: {
        attributes: {} as P,
        payload: {} as T,
      },
    },
  });

  return componentTemplate((attrs: P, children) => {
    return render(attrs, children);
  }) as ComponentWithProps<P, T>;
};
