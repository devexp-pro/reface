import type { ExpressionInterface } from "../Expression.ts";
import type { ExpressionType } from "../types.ts";

export type TextContent = string | number;

export class TextContentExpression<T extends TextContent>
  implements ExpressionInterface<T> {
  readonly type: ExpressionType = "text";

  private readonly TEXT_ENTITIES: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
  };

  is(value: unknown): value is T {
    return typeof value === "string" || typeof value === "number";
  }

  render({ node }: { node: T }): string {
    return String(node).replace(
      new RegExp(`[${Object.keys(this.TEXT_ENTITIES).join("")}]`, "g"),
      (char) => this.TEXT_ENTITIES[char],
    );
  }
}

export const textContentExpression = new TextContentExpression();
