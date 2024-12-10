import type { HTMLAttributes, HTMLAttributesMap } from "@reface/html";

// Базовый тип для styled компонента
export interface StyledComponent<
  Tag extends keyof HTMLAttributesMap | string = string,
> {
  (props?: HTMLAttributes<Tag>): StyledTagFunction<Tag>;
  rootClass: string;
  css: string;
  baseComponent?: StyledComponent<Tag>;
  tag: string;
}

// Тип для styled.[tag] функции
export interface StyledTagFunction<
  Tag extends keyof HTMLAttributesMap | string = string,
> {
  (strings: TemplateStringsArray, ...values: unknown[]): StyledComponent<Tag>;
  (
    props?: HTMLAttributes<Tag>,
  ): (
    strings: TemplateStringsArray,
    ...values: unknown[]
  ) => StyledComponent<Tag>;
}

// Тип для styled объекта с HTML тегами и кастомными элементами
export type StyledTags =
  & {
    [K in keyof HTMLAttributesMap]: K extends string ? StyledTagFunction<K>
      : never;
  }
  & {
    [key: string]: StyledTagFunction<string>;
  };

// Тип для styled функции
export interface StyledFunction {
  <T extends StyledComponent<any>>(component: T): StyledTagFunction<any>;
  <Tag extends keyof HTMLAttributesMap | string>(
    strings: TemplateStringsArray,
    ...values: unknown[]
  ): StyledComponent<Tag>;
}

// Объединяем все в один тип
export type Styled = StyledFunction & StyledTags;
