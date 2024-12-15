import type { ElementChildType, IRefaceTemplateElement } from "@reface";

export interface IStyledComponent<T extends string = string>
  extends IRefaceTemplateElement {
  (
    props?: Record<string, unknown>,
    children?: ElementChildType[],
  ): IRefaceTemplateElement;
  payload: {
    styled: {
      tag: T;
      rootClass: string;
      styles: string;
    };
  };
}

export interface IStyledTagFunction<Tag extends string> {
  (strings: TemplateStringsArray, ...values: unknown[]): IStyledComponent<Tag>;
}

// Основной тип styled API
export interface IStyled {
  <Tag extends string>(
    baseComponent: IStyledComponent<Tag>,
  ): IStyledTagFunction<Tag>;
  [tag: string]: IStyledTagFunction<string>;
}
