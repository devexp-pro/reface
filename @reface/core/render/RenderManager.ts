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

  constructor() {
    // Initialize handlers for all phases
    ["start", "beforeRender", "afterRender", "end"].forEach((phase) => {
      this.handlers.set(phase as RenderPhase, new Set());
    });
  }

  /**
   * Renders a template to HTML string.
   * Executes the full rendering pipeline with all lifecycle hooks.
   *
   * @param template - Template to render
   * @returns Rendered HTML string
   */
  render(template: ITemplate): string {
    this.runHandlers("start", { manager: this });
    const result = this.renderTemplate(template);
    const finalHtml = this.runHandlers("end", {
      html: result,
      manager: this,
    }) || result;
    return finalHtml as string;
  }

  /**
   * Renders a single template with beforeRender and afterRender hooks.
   *
   * @param template - Template to render
   * @returns Rendered HTML string
   */
  renderTemplate(template: ITemplate): string {
    const transformedTemplate = this.runHandlers("beforeRender", {
      template,
      manager: this,
    }) || template;

    const html = transformedTemplate.toHtml(this);

    const transformedHtml = this.runHandlers("afterRender", {
      template: transformedTemplate,
      html,
      manager: this,
    });
    console.log({
      transformedHtml,
      html,
    });
    return transformedHtml as string || html;
  }

  /**
   * Renders a single child element (template or primitive value).
   *
   * @param child - Child element to render
   * @returns Rendered HTML string
   */
  renderChild(child: ElementChildType): string {
    console.log("renderChild:", child);
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

  /**
   * Renders an array of child elements.
   *
   * @param children - Array of child elements
   * @returns Concatenated HTML string
   */
  renderChildren(children: ElementChildType[]): string {
    console.log("renderChildren:", children);
    return children
      .map((child) => this.renderChild(child))
      .join("");
  }

  /**
   * Registers a handler for a specific render phase.
   *
   * @param phase - Render phase to hook into
   * @param handler - Handler function
   */
  on(phase: RenderPhase, handler: Function): void {
    const handlers = this.handlers.get(phase);
    handlers?.add(handler);
  }

  /**
   * Removes a handler from a specific render phase.
   *
   * @param phase - Render phase to remove handler from
   * @param handler - Handler function to remove
   */
  off(phase: RenderPhase, handler: Function): void {
    const handlers = this.handlers.get(phase);
    handlers?.delete(handler);
  }

  /**
   * Storage for plugins to share data during rendering.
   */
  store = {
    get: <T>(pluginName: string) =>
      this.storage.get(pluginName) as T | undefined,
    set: <T>(pluginName: string, value: T) =>
      this.storage.set(pluginName, value),
  };

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

  isEmptyValue = isEmptyValue;
  isTemplate = isTemplate;
}
