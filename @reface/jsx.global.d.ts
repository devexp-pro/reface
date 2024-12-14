import type {
  ComponentProps,
  ElementChildType,
  ITemplate,
} from "./core/types.ts";

declare global {
  namespace JSX {
    type Element = ITemplate;

    interface ElementChildrenAttribute {
      children: ElementChildType | ElementChildType[];
    }

    interface IntrinsicElements {
      [elemName: string]: ComponentProps;
    }
  }

  // Глобальные функции для JSX
  const createElement: <P = ComponentProps>(
    type: string | ((props: P, children: ElementChildType[]) => ITemplate),
    props: P | null,
    ...children: ElementChildType[]
  ) => ITemplate;

  const Fragment: (props: { children: ElementChildType[] }) => ITemplate;
}

export {};
