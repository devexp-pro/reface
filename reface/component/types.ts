import type { ElementChildType, Template } from "@reface/html";

// Тип для значений в template literals
export type TemplateValue = ElementChildType | Template;

// Тип для функции рендеринга компонента
export interface ComponentRenderFunction<Props = object> {
  (props: Props, children: ElementChildType[]): ElementChildType;
}

// Тип для компонента с поддержкой JSX и template literals
export interface ComponentFunction<Props = object> {
  // JSX вызов
  (props: Props, children: ElementChildType[]): Template;

  // Template literal вызов
  (props: Props): (
    strings: TemplateStringsArray,
    ...values: TemplateValue[]
  ) => Template;
}
