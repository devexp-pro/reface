import type {
  ComponentFn,
  ComponentProps,
  ComponentRenderFn,
  ComponentWithProps,
  ElementChildType,
  IRefaceTemplate,
} from "@reface/types";
import { getChildren } from "./utils/getChildren.ts";

export const component: ComponentFn = <
  P extends ComponentProps,
  T extends IRefaceTemplate,
>(
  render: ComponentRenderFn<P, T>,
) => {
  return ((props = {} as P) => {
    return (
      strings = Object.assign([], { raw: [] }),
      ...values: ElementChildType[]
    ) => {
      return render(props, getChildren(strings, values));
    };
  }) as ComponentWithProps<P, T>;
};
