import type { IRenderManager, ITemplate, RenderPhase } from "./types.ts";
import type { ElementChildType } from "../templates/types.ts";
import { isEmptyValue, isTemplate } from "./renderUtils.ts";

/**
 * Manages the rendering process of templates with lifecycle hooks and plugin support.
 * Provides a pipeline for transforming templates and HTML during rendering.
 *
 * @implements {IRenderManager}
 *
 * @example
 * // Basic usage
 * const manager = new RenderManager();
 * const html = manager.render(template);
 *
 * // With lifecycle hooks
 * manager.on('beforeRender', ({ template }) => {
 *   // Transform template before rendering
 *   return modifiedTemplate;
 * });
 *
 * manager.on('afterRender', ({ html }) => {
 *   // Transform HTML after rendering
 *   return modifiedHtml;
 * });
 *
 * // Plugin storage
 * manager.store.set('plugin-name', { data: 'value' });
 * const data = manager.store.get('plugin-name');
 */
export class RenderManager implements IRenderManager {
  private handlers = new Map<RenderPhase, Set<Function>>();
  private storage = new Map<string, unknown>();

  private withPhase<T extends unknown[], R>(
    phase: "render" | "renderTemplate" | "renderChild" | "renderChildren",
    method: (...args: T) => R,
    ...args: T
  ): R {
    const startPhase = `${phase}:start` as RenderPhase;
    const endPhase = `${phase}:end` as RenderPhase;

    const startResult = this.runHandlers(startPhase, {
      [
        phase === "render"
          ? "template"
          : phase.replace("render", "").toLowerCase()
      ]: args[0],
    });
    if (startResult) return startResult as R;

    const result = method.apply(this, args);

    return (this.runHandlers(endPhase, {
      [
        phase === "render"
          ? "template"
          : phase.replace("render", "").toLowerCase()
      ]: args[0],
      html: result,
    }) || result) as R;
  }

  render(template: ITemplate): string {
    return this.withPhase("render", this.renderImpl, template);
  }

  private renderImpl(template: ITemplate): string {
    return this.renderTemplate(template);
  }

  renderTemplate(template: ITemplate): string {
    return this.withPhase("renderTemplate", this.renderTemplateImpl, template);
  }

  private renderTemplateImpl(template: ITemplate): string {
    return template.toHtml(this);
  }

  renderChild(child: ElementChildType): string {
    return this.withPhase("renderChild", this.renderChildImpl, child);
  }

  private renderChildImpl(child: ElementChildType): string {
    if (this.isEmptyValue(child)) {
      return "";
    }
    if (Array.isArray(child)) {
      return this.renderChildren(child);
    }
    if (this.isTemplate(child)) {
      return this.renderTemplate(child);
    }
    return String(child);
  }

  renderChildren(children: ElementChildType[]): string {
    return this.withPhase("renderChildren", this.renderChildrenImpl, children);
  }

  private renderChildrenImpl(children: ElementChildType[]): string {
    return children
      .map((child) => this.renderChild(child))
      .join("");
  }

  isEmptyValue = isEmptyValue;
  isTemplate = isTemplate;

  store = {
    get: <T>(pluginName: string) =>
      this.storage.get(pluginName) as T | undefined,
    set: <T>(pluginName: string, value: T) =>
      this.storage.set(pluginName, value),
  };

  on(phase: RenderPhase, handler: Function): void {
    if (!this.handlers.has(phase)) {
      this.handlers.set(phase, new Set());
    }
    this.handlers.get(phase)!.add(handler);
  }

  off(phase: RenderPhase, handler: Function): void {
    this.handlers.get(phase)?.delete(handler);
  }

  private runHandlers(
    phase: RenderPhase,
    params: Record<string, unknown>,
  ): unknown {
    let result = "";
    const handlers = this.handlers.get(phase) || new Set();

    for (const handler of handlers) {
      const handlerResult = handler(params);
      if (handlerResult !== undefined) {
        result = handlerResult;
      }
    }

    return result;
  }
}
