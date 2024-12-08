import type {
  ComponentFunction,
  SimpleComponentFunction,
  StyledComponentFunction,
  HTMLAttributes,
  Template,
  ElementChild,
} from "../html/types.ts";

// Тип для Fragment компонента
export type FragmentComponent = {
  ({ children }: { children?: ElementChild[] }): ElementChild[];
  isFragment: true;
};

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
    type Element = Template;

    // Обновленный тип для компонентов
    type ElementType<P = any> =
      | keyof IntrinsicElements
      | ComponentFunction<P>
      | SimpleComponentFunction<P>
      | StyledComponentFunction<P>
      | FragmentComponent;

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
