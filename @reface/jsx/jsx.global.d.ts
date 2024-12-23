import type {
  ElementChildType,
  Template,
  TemplateAttributes,
} from "@reface/template";

declare global {
  namespace JSX {
    // Базовый тип для JSX элементов
    type Element = Template<any, any, any>;

    // Определяем как компоненты получают children
    interface ElementChildrenAttribute {
      children: ElementChildType;
    }

    // Определяем встроенные HTML элементы
    interface IntrinsicElements {
      [elemName: string]: TemplateAttributes;
    }

    // Определяем тип компонента
    type ElementType =
      | string
      | ((
        props: any,
        children?: ElementChildType[],
      ) => Template<any, any, any>);

    // Определяем атрибуты для пользовательских компонентов
    interface IntrinsicAttributes extends Record<string, any> {}
  }
}
