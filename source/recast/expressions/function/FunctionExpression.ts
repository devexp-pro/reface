import type { ExpressionInterface, RenderContext } from "../Expression.ts";
import { PROXY_PAYLOAD } from "@recast/expressions/mod.ts";
import type { ExpressionType } from "../types.ts";
import type { RenderOptions } from "@recast/recast/mod.ts";
import type { Child, Children } from "../types.ts";

export type FunctionNode = (userContext?: RenderOptions) => Child[] | Child;

class FunctionExpression implements ExpressionInterface<FunctionNode> {
  readonly type: ExpressionType = "function";

  is(value: unknown): value is FunctionNode {
    return typeof value === "function" && !(PROXY_PAYLOAD in value);
  }

  render(
    { node, context, userContext = {} }: {
      node: FunctionNode;
      context: RenderContext;
      userContext?: RenderOptions;
    },
  ) {
    const result = node(userContext);
    return context.render(result);
  }
}

export const functionExpression = new FunctionExpression();
