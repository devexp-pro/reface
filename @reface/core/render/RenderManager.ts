import type {
  ClassValue,
  ElementChildType,
  HTMLAttributes,
  IRenderManager,
  ITemplate,
  RefaceEvent,
  RenderHandler,
  StyleValue,
} from "../types.ts";
import { isEmptyValue, isTemplate } from "./renderUtils.ts";
import { REFACE_EVENT } from "../constants.ts";

export class RenderManager implements IRenderManager {
  private handlers = new Map<RefaceEvent, Set<Function>>();
  private storage = new Map<string, unknown>();

  private withPhase<T extends unknown[], R>(
    phase: typeof REFACE_EVENT.RENDER[keyof typeof REFACE_EVENT.RENDER],
    method: (...args: T) => R,
    ...args: T
  ): R {
    const startResult = this.runHandlers(phase.START, {
      manager: this,
      template: args[0],
    });
    if (startResult) return startResult as R;

    const result = method.apply(this, args);

    return (this.runHandlers(phase.END, {
      manager: this,
      template: args[0],
      html: result,
    }) || result) as R;
  }

  render(template: ITemplate): string {
    return this.withPhase(
      REFACE_EVENT.RENDER.RENDER,
      this.renderImpl,
      template,
    );
  }

  private renderImpl(template: ITemplate): string {
    return this.renderTemplate(template);
  }

  renderTemplate(template: ITemplate): string {
    return this.withPhase(
      REFACE_EVENT.RENDER.TEMPLATE,
      this.renderTemplateImpl,
      template,
    );
  }

  private renderTemplateImpl(template: ITemplate): string {
    return template.toHtml(this);
  }

  renderChild(child: ElementChildType): string {
    return this.withPhase(
      REFACE_EVENT.RENDER.CHILD,
      this.renderChildImpl,
      child,
    );
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
    return this.withPhase(
      REFACE_EVENT.RENDER.CHILDREN,
      this.renderChildrenImpl,
      children,
    );
  }

  private renderChildrenImpl(children: ElementChildType[]): string {
    return children.map((child) => this.renderChild(child)).join("");
  }

  renderAttributes(attrs: HTMLAttributes): string {
    return this.withPhase(REFACE_EVENT.RENDER.ATTRIBUTES, () => {
      const parts: string[] = [];
      for (const [key, value] of Object.entries(attrs)) {
        if (value == null) continue;
        if (key === "class") {
          const className = this.renderClassAttribute(value as ClassValue);
          if (className) parts.push(`class="${className}"`);
        } else if (key === "style") {
          const style = this.renderStyleAttribute(value as StyleValue);
          if (style) parts.push(`style="${style}"`);
        } else {
          parts.push(`${key}="${value}"`);
        }
      }
      return parts.join(" ");
    });
  }

  renderClassAttribute(value: ClassValue): string {
    return this.withPhase(REFACE_EVENT.RENDER.CLASS, () => {
      if (!value) return "";
      if (Array.isArray(value)) {
        return value.map((v) => this.renderClassAttribute(v)).filter(Boolean)
          .join(" ");
      }
      if (typeof value === "object") {
        return Object.entries(value)
          .filter(([, enabled]) => enabled)
          .map(([className]) => className)
          .join(" ");
      }
      return String(value);
    });
  }

  renderStyleAttribute(value: StyleValue): string {
    return this.withPhase(REFACE_EVENT.RENDER.STYLE, () => {
      if (!value) return "";
      if (Array.isArray(value)) {
        return value.map((v) => this.renderStyleAttribute(v)).filter(Boolean)
          .join(";");
      }
      if (typeof value === "object") {
        return Object.entries(value)
          .map(([prop, val]) => `${prop}:${val}`)
          .join(";");
      }
      return String(value);
    });
  }

  on(event: RefaceEvent, handler: RenderHandler): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
  }

  off(event: RefaceEvent, handler: Function): void {
    this.handlers.get(event)?.delete(handler);
  }

  private runHandlers(
    event: RefaceEvent,
    params: Record<string, unknown>,
  ): unknown {
    let result;
    const handlers = this.handlers.get(event) || new Set();

    for (const handler of handlers) {
      const handlerResult = handler(params);
      if (handlerResult !== undefined) {
        result = handlerResult;
      }
    }

    return result;
  }

  store = {
    get: <T>(pluginName: string) =>
      this.storage.get(pluginName) as T | undefined,
    set: <T>(pluginName: string, value: T) =>
      this.storage.set(pluginName, value),
  };
}
