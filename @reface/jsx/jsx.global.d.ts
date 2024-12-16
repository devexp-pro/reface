import type {
  ComponentProps,
  ComponentWithProps,
  ElementChildType,
  IRefaceTemplate,
} from "@reface/types";

declare global {
  namespace JSX {
    // Базовый тип для JSX элементов
    type Element = IRefaceTemplate;

    // Определяем как компоненты получают children
    interface ElementChildrenAttribute {
      children: ElementChildType | ElementChildType[];
    }

    // Определяем встроенные HTML элементы
    interface IntrinsicElements {
      [elemName: string]: ComponentProps;
    }

    // Определяем тип компонента - функция, которая может быть использована как JSX компонент
    type ElementType = string | ComponentWithProps;

    // Определяем атрибуты для пользовательских компонентов
    interface IntrinsicAttributes extends ComponentProps {}
  }
}
