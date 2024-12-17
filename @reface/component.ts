import type {
  ComponentFn,
  ComponentProps,
  ComponentRenderFn,
  ComponentWithProps,
  IRefaceTemplate,
} from "@reface/types";
import { RefaceTemplate } from "./RefaceTemplate.ts";

export const component: ComponentFn = <
  P extends ComponentProps,
  T extends IRefaceTemplate,
>(
  render: ComponentRenderFn<P, T>,
) => {
  return new RefaceTemplate({
    transformer: (attributes, children) => {
      return render(attributes, children);
    },
  });
};
