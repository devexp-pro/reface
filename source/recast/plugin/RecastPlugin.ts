import { Child } from "@recast";
import type { Recast } from "../recast/Recast.ts";
import type {
  Children,
  ExpressionInterface,
  RenderContext,
} from "@recast/expressions";

export type BeforeRenderHook<T = any> = (params: {
  template: T;
  context: RenderContext;
}) => T | void;

export type AfterRenderHook<T = any> = (params: {
  template: T;
  html: string;
  context: RenderContext;
}) => string | void;

export class RecastPlugin {
  beforeHooks = new Map<ExpressionInterface, BeforeRenderHook[]>();
  afterHooks = new Map<ExpressionInterface, AfterRenderHook[]>();

  before<N, T extends ExpressionInterface<N>>(
    expression: T,
    hook: BeforeRenderHook<N>,
  ): void {
    const hooks = this.beforeHooks.get(expression) || [];
    hooks.push(hook);
    this.beforeHooks.set(expression, hooks);
  }

  after<N, T extends ExpressionInterface<N>>(
    expression: T,
    hook: AfterRenderHook<N>,
  ): void {
    const hooks = this.afterHooks.get(expression) || [];
    hooks.push(hook);
    this.afterHooks.set(expression, hooks);
  }

  runBeforeHooks<T>(expression: ExpressionInterface, params: {
    template: T;
    context: RenderContext;
  }): T {
    const hooks = this.beforeHooks.get(expression) || [];
    let result = params.template;

    for (const hook of hooks) {
      const hookResult = hook({ ...params, template: result });
      if (hookResult !== undefined) {
        result = hookResult;
      }
    }

    return result;
  }

  runAfterHooks<T>(expression: ExpressionInterface, params: {
    template: T;
    html: string;
    context: RenderContext;
  }): string {
    const hooks = this.afterHooks.get(expression) || [];
    let result = params.html;

    for (const hook of hooks) {
      const hookResult = hook({ ...params, html: result });
      if (hookResult !== undefined) {
        result = hookResult;
      }
    }

    return result;
  }
}
