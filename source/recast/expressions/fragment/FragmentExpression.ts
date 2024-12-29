import type { ExpressionInterface, RenderContext } from "../Expression.ts";
import type { Child, Children, ExpressionType } from "../types.ts";

export interface FragmentNode {
  type: "fragment";
  children: Children;
  meta: Record<string, unknown>;
}

class FragmentExpression<
  T extends FragmentNode = FragmentNode,
> implements ExpressionInterface<T> {
  readonly type: ExpressionType = "fragment";

  is(value: unknown): value is T {
    return (value as T)?.type === "fragment";
  }

  render({ node, context }: { node: T; context: RenderContext }) {
    return node.children
      ?.map((child) => context.render(child as Child))
      .join("");
  }

  create(children: Children | Child = []): T {
    return {
      type: "fragment",
      children: Array.isArray(children) ? children : [children],
      meta: {},
    } as T;
  }

  copy(template: T): T {
    return {
      type: "fragment",
      children: [...template.children],
      meta: { ...template.meta },
    } as T;
  }
}

export const fragmentExpression = new FragmentExpression();
