import type { ExpressionInterface, RenderContext } from "../Expression.ts";
import type { Child, Children, ExpressionType } from "../types.ts";

export type ArrayNode = Children;

class ArrayExpression implements ExpressionInterface<ArrayNode> {
  readonly type: ExpressionType = "array";

  is(value: unknown): value is ArrayNode {
    return Array.isArray(value);
  }

  render({ node, context }: { node: ArrayNode; context: RenderContext }) {
    return node
      .map((item) => context.render(item as Child))
      .join("");
  }
}

export const arrayExpression = new ArrayExpression();
