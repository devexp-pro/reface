import type { IRefaceRenderManager } from "./composer.types.ts";
import type { IRefaceTemplate } from "./template.types.ts";

export type PrimitiveChild = string | number | boolean | null | undefined;
export type ComplexChild = IRefaceTemplate | ElementChildType[];
export type ElementChildType = PrimitiveChild | ComplexChild;

export type ComponentProps = Record<string, unknown>;

export type BaseTemplate<P = ComponentProps> = {
  type: string;
  payload?: P;
  toHtml(manager: IRefaceRenderManager): string;
};
