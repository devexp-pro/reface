import {
  arrayExpression,
  asyncExpression,
  type Child,
  type Children,
  componentExpression,
  elementExpression,
  type ExpressionInterface,
  fragmentExpression,
  functionExpression,
  htmlContentExpression,
  primitiveExpression,
  type RenderContext,
  textContentExpression,
} from "@recast/expressions";
import type { RecastPluginInterface } from "@recast/plugin";

import type { RenderOptions, RenderResult } from "./types.ts";

type PromiseChild = Promise<Child | Children | Promise<Child | Children>>;

interface AsyncRender {
  promise: PromiseChild;
  marker: string;
}

export type RenderData = {
  context: RenderContext;
  userContext: RenderOptions;
};

export class Recast {
  private plugins = new Map<string, RecastPluginInterface>();
  private expressions: ExpressionInterface<any>[] = [
    componentExpression,
    elementExpression,
    fragmentExpression,
    functionExpression,
    primitiveExpression,
    textContentExpression,
    htmlContentExpression,
    arrayExpression,
    asyncExpression,
  ];

  async use(
    plugin: RecastPluginInterface | RecastPluginInterface[],
  ): Promise<void> {
    if (Array.isArray(plugin)) {
      for (const p of plugin) {
        await this.use(p);
      }
      return;
    }

    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin "${plugin.name}" is already registered`);
    }

    this.plugins.set(plugin.name, plugin);
    await plugin.setup(this);
  }

  getPlugin<T extends RecastPluginInterface>(
    plugin: T,
  ): T | undefined {
    return this.plugins.get(plugin.name) as T | undefined;
  }

  async render(
    template: unknown,
    userContext?: RenderOptions,
  ): Promise<RenderResult> {
    asyncExpression.clear();

    const data: RenderData = {
      context: {
        render: (value: Child) =>
          this.renderNode({
            node: value,
            ...data,
          }),
      },
      userContext: {
        ...userContext,
      },
    };

    for (const plugin of this.plugins.values()) {
      const result = plugin.renderBefore?.(template as Child);
      if (result !== undefined) {
        template = result;
      }
    }

    let result = this.renderNode({ node: template, ...data });

    result = await asyncExpression.processAsyncQueue(result);

    let html = result;
    for (const plugin of this.plugins.values()) {
      const newHtml = plugin.renderAfter?.(template as Child, html);
      if (newHtml !== undefined) {
        html = newHtml;
      }
    }

    return { html };
  }

  async renderHtml(
    template: unknown,
    userContext?: RenderOptions,
  ): Promise<string> {
    const { html } = await this.render(template, userContext);
    return html;
  }

  renderNode(
    { node, ...data }: RenderData & { node: unknown },
  ): string {
    for (const expression of this.expressions) {
      if (expression.is(node)) {
        let processedNode = node;
        for (const plugin of this.plugins.values()) {
          const result = plugin.runBeforeHooks(expression, {
            ...data,
            template: processedNode,
          });
          if (result !== undefined) {
            processedNode = result;
          }
        }

        const renderedHtml = expression.render({
          node: processedNode,
          ...data,
        });

        let processedHtml = renderedHtml;
        for (const plugin of this.plugins.values()) {
          const result = plugin.runAfterHooks(expression, {
            ...data,
            template: processedNode,
            html: processedHtml,
          });
          if (result !== undefined) {
            processedHtml = String(result);
          }
        }

        return processedHtml;
      }
    }
    return String(node);
  }
}
