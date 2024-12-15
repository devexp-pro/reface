import type {
  ComponentProps,
  ElementChildType,
  IRefaceTemplate,
} from "../types.ts";

declare global {
  const createElement: <P = ComponentProps>(
    type:
      | string
      | ((props: P, children: ElementChildType[]) => IRefaceTemplate),
    props: P | null,
    ...children: ElementChildType[]
  ) => IRefaceTemplate;

  const Fragment: (props: { children: ElementChildType[] }) => IRefaceTemplate;
}

export {};
