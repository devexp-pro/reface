// @reface/jsx/jsx.fn.global.d.ts
import type {
  ComponentProps,
  ComponentWithProps,
  ElementChildType,
  IRefaceTemplate,
} from "@reface/types";

declare global {
  const createElement: <P extends ComponentProps = ComponentProps>(
    type: string | ComponentWithProps<IRefaceTemplate>,
    props: P | null,
    ...children: ElementChildType[]
  ) => IRefaceTemplate;

  const Fragment: ComponentWithProps<IRefaceTemplate>;
}

export {};
