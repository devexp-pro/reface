import type { IRenderManager, RenderPhase } from "./types.ts";
import type {
  ClassValue,
  ElementChildType,
  HTMLAttributes,
  ITemplate,
  StyleValue,
} from "../templates/types.ts";
import { isEmptyValue, isTemplate } from "./renderUtils.ts";
import {
  formatAttributes,
  formatClassName,
  formatStyle,
} from "../utils/attributes.ts";

export class RenderManager implements IRenderManager {
  private handlers = new Map<RenderPhase, Set<Function>>();
  private storage = new Map<string, unknown>();

  private withPhase<T extends unknown[], R>(
    phase: Exclude<RenderPhase, `${string}:start` | `${string}:end`>,
    method: (...args: T) => R,
    ...args: T
  ): R {
    const startPhase = `${phase}:start` as RenderPhase;
    const endPhase = `${phase}:end` as RenderPhase;

    const params = this.getPhaseParams(phase, args[0]);
    const startResult = this.runHandlers(startPhase, params);
    if (startResult) return startResult as R;

    const result = method.apply(this, args);

    return (this.runHandlers(endPhase, { ...params, html: result }) ||
      result) as R;
  }

  private getPhaseParams(
    phase: string,
    value: unknown,
  ): Record<string, unknown> {
    switch (phase) {
      case "render":
        return { template: value, manager: this };
      case "renderTemplate":
        return { template: value, manager: this };
      case "renderChild":
        return { child: value, manager: this };
      case "renderChildren":
        return { children: value, manager: this };
      case "renderAttributes":
        return { attributes: value, manager: this };
      case "renderClassAttribute":
        return { class: value, manager: this };
      case "renderStyleAttribute":
        return { style: value, manager: this };
      default:
        return { manager: this };
    }
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
    if (isEmptyValue(child)) {
      return "";
    }
    if (Array.isArray(child)) {
      return this.renderChildren(child);
    }
    if (isTemplate(child)) {
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

  renderAttributes(attrs: HTMLAttributes): string {
    return this.withPhase("renderAttributes", () => {
      const formatted = formatAttributes(attrs);
      return formatted.trimStart();
    }, attrs);
  }

  renderClassAttribute(value: ClassValue): string {
    return this.withPhase(
      "renderClassAttribute",
      () => formatClassName(value),
      value,
    );
  }

  renderStyleAttribute(value: StyleValue): string {
    return this.withPhase(
      "renderStyleAttribute",
      () => formatStyle(value),
      value,
    );
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
    let result;
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
