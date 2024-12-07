import type { HTMLAttributes, Template } from "../core/types.ts";

declare global {
  namespace JSX {
    // Элемент может быть либо Template, либо функцией, возвращающей Template
    type Element = Template | ((props: any) => Template);

    // Поддержка функциональных компонентов
    interface ElementClass {
      render(): Template;
    }

    // Атрибуты для всех элементов
    interface IntrinsicAttributes {
      children?: unknown;
    }

    // Базовые HTML элементы
    interface IntrinsicElements {
      div: HTMLAttributes;
      span: HTMLAttributes;
      button: HTMLAttributes & {
        type?: "button" | "submit" | "reset";
        disabled?: boolean;
      };
      input: HTMLAttributes & {
        type?: "text" | "password" | "email" | "number" | "checkbox" | "radio";
        value?: string | number;
        checked?: boolean;
      };
      [elemName: string]: HTMLAttributes;
    }

    // Определяем имя свойства для children
    interface ElementChildrenAttribute {
      children: {};
    }
  }
}

export {};
