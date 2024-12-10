import type {
  ElementChildType,
  HTMLAttributes,
  HTMLElement,
  Template,
  TemplateFragment,
} from "@reface/html";

// Базовый тип для компонента
export interface ComponentFunction<Props = object> {
  (
    props: Props,
    children: ElementChildType | ElementChildType[],
  ): Template;
}

// Тип для Fragment компонента
export interface FragmentComponent {
  (
    props: { children?: ElementChildType | ElementChildType[] },
  ): TemplateFragment;
}

// JSX атрибуты
export interface JSXAttributes extends HTMLAttributes {
  key?: string;
  ref?: (element: HTMLElement) => void;
  [key: string]: unknown;
}

// Расширяем существующие JSX типы
declare global {
  namespace JSX {
    // Базовый тип элемента
    type Element = Template;

    // Определяем как JSX передает children
    interface ElementChildrenAttribute {
      children: ElementChildType | ElementChildType[];
    }

    // Определяем атрибуты для элементов
    interface IntrinsicElements {
      [elemName: string]: JSXAttributes;
    }

    // Определяем поддержку функциональных компонентов
    interface ElementClass extends ComponentFunction {}
    interface ElementAttributesProperty {
      props: {};
    }
  }
}
