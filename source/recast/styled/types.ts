import type {
  ComponentNode,
  ElementNode,
  FragmentNode,
  HTMLAttributes,
  HTMLElementTagAttributes,
} from "@recast/expressions";

interface StyledMethods {
  getStyledClass(): string;
}

type HasClassAttribute<P> = P extends { class?: any } ? P : never;

type StyledComponent<T> = {
  (
    template: TemplateStringsArray,
    ...values: any[]
  ): T extends ElementNode<infer P, infer E> ? ElementNode<P, E & StyledMethods>
    : T extends ComponentNode<infer P, infer E>
      ? ComponentNode<HasClassAttribute<P>, E & StyledMethods>
    : T extends FragmentNode ? ElementNode<HTMLAttributes, StyledMethods>
    : never;
};

type Styled =
  & {
    <
      T extends
        | ElementNode<any, any>
        | ComponentNode<any, any>
        | FragmentNode,
    >(
      template: T,
    ): StyledComponent<T>;
  }
  & {
    [Tag in keyof HTMLElementTagAttributes]: StyledComponent<
      ElementNode<HTMLElementTagAttributes[Tag]>
    >;
  };

export interface MetaStyled {
  styledClass: string;
  styles: {
    class: string;
    css: string;
  }[];
}

export type { HasClassAttribute, Styled, StyledComponent, StyledMethods };
