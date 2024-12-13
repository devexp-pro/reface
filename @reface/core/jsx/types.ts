import type { ElementChildType, ITemplate } from "../templates/types.ts";

export interface ComponentProps {
  children?: ElementChildType | ElementChildType[];
  [key: string]: unknown;
}

export interface JSXComponent<P = ComponentProps> {
  (props: P, children: ElementChildType[]): ITemplate;
}
