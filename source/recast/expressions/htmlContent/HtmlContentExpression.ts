import type { ExpressionInterface } from "../Expression.ts";
import type { ExpressionType } from "../types.ts";

import { primitiveExpression } from "../primitives/PrimitiveExpression.ts";

export type Meta<T = Record<string, unknown>> = T;

export interface HtmlContent {
  type: "html";
  content: string;
  meta: Meta;
}

export class HtmlContentExpression<T extends HtmlContent = HtmlContent>
  implements ExpressionInterface<T> {
  readonly type: ExpressionType = "html";

  private processValue(value: unknown): string {
    if (primitiveExpression.is(value)) {
      return primitiveExpression.render({ node: value });
    }
    return String(value);
  }

  is(value: unknown): value is T {
    return (value as T)?.type === "html";
  }

  render({
    node,
  }: {
    node: T;
  }): string {
    return node.content;
  }

  create(content: unknown): T {
    return {
      type: "html" as const,
      content: this.processValue(content),
      meta: {},
    } as T;
  }

  copy(template: T): T {
    return {
      type: "html" as const,
      content: template.content,
      meta: { ...template.meta },
    } as T;
  }
}

export const htmlContentExpression = new HtmlContentExpression();
