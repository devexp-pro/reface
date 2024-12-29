import {
  type ComponentAttributes,
  componentExpression,
  type ComponentNode,
  type ComponentPayload,
  type ComponentRenderFn,
} from "@recast/expressions";

export const component = <
  P extends ComponentAttributes = ComponentAttributes,
  E extends Record<string, any> = Record<string, any>,
>(
  render: ComponentRenderFn<P>,
  options?: ComponentPayload,
): ComponentNode<P, E> => {
  return componentExpression.create({
    render: render as ComponentRenderFn<ComponentAttributes>,
    methods: options?.methods || {},
    meta: options?.meta || {},
  });
};
