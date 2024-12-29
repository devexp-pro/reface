import type { Child, Children } from "@recast";
import type { ExpressionType } from "./types.ts";
import type { RenderOptions } from "@recast/recast";

export interface RenderContext {
  render: (value: Children | Child) => string;
}

export interface ExpressionInterface<Node = unknown> {
  readonly type: ExpressionType;
  is(value: unknown): value is Node;
  render({
    node,
    userContext,
    context,
  }: {
    node: Node;
    userContext?: RenderOptions;
    context: RenderContext;
  }): string;
  create?(value: unknown): Node;
  copy?(template: Node): Node;
}
