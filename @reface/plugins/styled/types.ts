import type {
  ComponentProps,
  ComponentWithProps,
  IRefaceTemplateElement,
} from "@reface/types";

// Тип для styled компонента, расширяющий ComponentWithProps
export interface StyledPayload {
  styled: {
    styles: string;
    rootClass: string;
    tag: string;
  };
}

export interface StyledComponent<
  P extends ComponentProps = ComponentProps,
> extends ComponentWithProps<P, IRefaceTemplateElement> {
  tag: string;
  payload: StyledPayload;
}

export interface StyledTagFn<P extends ComponentProps = ComponentProps> {
  (strings: TemplateStringsArray, ...values: unknown[]): StyledComponent<P>;
}

export interface StyledFn {
  <P extends ComponentProps = ComponentProps>(
    component: StyledComponent<P>,
  ): StyledTagFn<P>;
  [tag: string]: StyledTagFn<ComponentProps>;
}
