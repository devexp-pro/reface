import type { ComponentProps, ElementChildType } from "./base.types.ts";
import type { IRefaceTemplate } from "./template.types.ts";
import type { RefaceTemplateFn } from "./template.types.ts";

export type BaseComponent<
  Props extends ComponentProps = ComponentProps,
  Template extends IRefaceTemplate = IRefaceTemplate,
> = {
  (props?: Props): RefaceTemplateFn<Template>;
};

export type ComponentWithProps<
  P extends ComponentProps = ComponentProps,
  T extends IRefaceTemplate = IRefaceTemplate,
> = BaseComponent<P, T>;

export type ComponentRenderFn<
  P extends ComponentProps = ComponentProps,
  T extends IRefaceTemplate = IRefaceTemplate,
> = {
  (props: P, children?: ElementChildType[]): T;
};

export type ComponentFn = {
  <
    P extends ComponentProps = ComponentProps,
    T extends IRefaceTemplate = IRefaceTemplate,
  >(
    fn: ComponentRenderFn<P, T>,
  ): ComponentWithProps<P, T>;
};

export type ElementFactoryFn = {
  (tag: string): ComponentWithProps<ComponentProps, IRefaceTemplate>;
};
