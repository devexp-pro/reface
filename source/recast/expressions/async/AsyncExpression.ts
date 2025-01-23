import type { ExpressionInterface, RenderContext } from "../Expression.ts";
import type { Child, Children, ExpressionType } from "../types.ts";

export type AsyncNode = Promise<Child | Children>;

class AsyncExpression implements ExpressionInterface<AsyncNode> {
  readonly type: ExpressionType = "async";
  private asyncQueue = new Map<
    string,
    { promise: Promise<string>; marker: string }
  >();

  is(value: unknown): value is AsyncNode {
    return value instanceof Promise;
  }

  clear() {
    this.asyncQueue.clear();
  }

  render(
    { node, context }: { node: AsyncNode; context: RenderContext },
  ): string {
    const id = `async-${Math.random().toString(36).slice(2)}`;
    const marker = `<!-- recast-async:${id} -->`;

    const promise = node
      .then((result) => context.render(result))
      .catch((error) => {
        const errorMessage = error instanceof Error
          ? error.message
          : String(error);
        return `<!-- recast-error: ${errorMessage} -->`;
      });

    this.asyncQueue.set(id, { promise, marker });
    return marker;
  }

  async processAsyncQueue(html: string): Promise<string> {
    if (this.asyncQueue.size === 0) {
      return html;
    }

    const currentQueue = new Map(this.asyncQueue);
    this.asyncQueue.clear();

    const results = await Promise.allSettled(
      Array.from(currentQueue.entries()).map(async (
        [_, { promise, marker }],
      ) => ({
        marker,
        result: await promise,
      })),
    );

    const replacements = new Map(
      results
        .filter((
          r,
        ): r is PromiseFulfilledResult<{ marker: string; result: string }> =>
          r.status === "fulfilled"
        )
        .map((r) => [r.value.marker, r.value.result]),
    );

    const processedHtml = html.replace(
      /<!-- recast-async:[^>]+ -->/g,
      (marker) => replacements.get(marker) ?? marker,
    );

    if (this.asyncQueue.size > 0) {
      return this.processAsyncQueue(processedHtml);
    }

    return processedHtml;
  }
}

export const asyncExpression: AsyncExpression = new AsyncExpression();
