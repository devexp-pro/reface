import type { ExpressionInterface } from "../Expression.ts";
import type { ExpressionType } from "../types.ts";

export type PrimitiveValue =
  | null
  | undefined
  | boolean
  | symbol
  | bigint
  | Date
  | RegExp
  | typeof NaN;

class PrimitiveExpression implements ExpressionInterface<PrimitiveValue> {
  readonly type = "primitive";

  is(value: unknown): value is PrimitiveValue {
    if (value === null || value === undefined) return true;
    if (Number.isNaN(value)) return true;

    return typeof value === "boolean" ||
      typeof value === "symbol" ||
      typeof value === "bigint" ||
      value instanceof Date ||
      value instanceof RegExp;
  }

  render({ node: _ }: { node?: PrimitiveValue }): string {
    return "";
  }
}

export const primitiveExpression: PrimitiveExpression =
  new PrimitiveExpression();
