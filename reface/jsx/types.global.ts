import type {
  ComponentFunction,
  SimpleComponentFunction,
  StyledComponentFunction,
  HTMLAttributes,
  Template,
  ElementChild,
} from "../core/types.ts";

// JSX элемент - это всегда Template
type JSXElement = Template;

// Тип для children в JSX
type JSXElementChild = ElementChild;

// Расширяем HTMLAttributes для JSX
interface JSXAttributes extends HTMLAttributes {
  children?: JSXElementChild | JSXElementChild[];
}

// Тип для пропсов компонента
type ComponentProps<P = object> = P & JSXAttributes;

declare global {
  namespace JSX {
    // JSX всегда возвращает Template
    type Element = Template;

    // Тип для компонентов, которые можно использовать в JSX
    type ElementType<P = any> =
      | keyof JSXIntrinsicElements
      | ComponentFunction<P>
      | SimpleComponentFunction<P>
      | StyledComponentFunction<P>;

    // Встроенные HTML элементы
    interface IntrinsicElements {
      [elemName: string]: JSXAttributes;
    }
  }
}

export type {
  ComponentFunction,
  SimpleComponentFunction,
  JSXAttributes,
  JSXElement,
  JSXElementChild,
  ComponentProps,
};
