import type {
  Template,
  TemplateAttributes,
  TemplatePayload,
} from "@reface/template";

// Базовый интерфейс для styled payload
export interface StyledPayload extends TemplatePayload {
  styled: {
    styles: string;
    rootClass: string;
    tag: string;
  };
}

// Тип для styled компонента
export type StyledComponent = Template<TemplateAttributes, StyledPayload>;

// Функция для создания styled компонента из тега
export type StyledTagFn = (
  strings: TemplateStringsArray,
  ...values: unknown[]
) => StyledComponent;

// Основная функция styled
export type StyledFn = {
  // Вызов styled для существующего компонента
  (component: StyledComponent): StyledTagFn;
  // Доступ к HTML тегам через proxy
  [tag: string]: StyledTagFn;
};

// Тип для атрибутов styled компонента
export interface StyledAttributes extends TemplateAttributes {
  class?: string | string[];
  style?: string | Record<string, string | number>;
  [key: string]: unknown;
}
