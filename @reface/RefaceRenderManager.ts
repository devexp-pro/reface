import type {
  ClassValue,
  ElementChildType,
  HTMLAttributes,
  IRefaceRenderManager,
  IRefaceTemplate,
  RefaceEvent,
  RenderHandler,
  StyleValue,
} from "./types.ts";
import { isEmptyValue, isTemplate } from "./utils/renderUtils.ts";
import { REFACE_EVENT } from "./constants.ts";
import type { RefaceComposer } from "./RefaceComposer.ts";

export class RefaceRenderManager implements IRefaceRenderManager {
  private handlers = new Map<RefaceEvent, Set<Function>>();
  private storage = new Map<string, unknown>();
  private composer: RefaceComposer;
  constructor({ composer }: { composer: RefaceComposer }) {
    this.composer = composer;
  }

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

  render(template: IRefaceTemplate): string {
    return this.withPhase(
      REFACE_EVENT.RENDER.RENDER,
      this.renderImpl,
      template,
    );
  }

  private renderImpl(template: IRefaceTemplate): string {
    return this.renderTemplate(template);
  }

  renderTemplate(template: IRefaceTemplate): string {
    return this.withPhase(
      REFACE_EVENT.RENDER.TEMPLATE,
      this.renderTemplateImpl,
      template,
    );
  }

  private renderTemplateImpl(template: IRefaceTemplate): string {
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
          if (typeof value === "string" && value.includes('"')) {
            parts.push(`${key}='${value}'`);
          } else {
            parts.push(`${key}="${value}"`);
          }
        }
      }
      return parts.join(" ");
    });
  }

  renderClassAttribute(value: ClassValue): string {
    return this.withPhase(REFACE_EVENT.RENDER.CLASS, () => {
      const classes = new Set<string>();

      const addClass = (val: ClassValue) => {
        if (!val) return;

        if (Array.isArray(val)) {
          val.forEach((v) => addClass(v));
        } else if (typeof val === "object") {
          Object.entries(val)
            .filter(([, enabled]) => enabled)
            .forEach(([className]) => className && addClass(className));
        } else {
          String(val)
            .split(/\s+/)
            .filter(Boolean)
            .forEach((className) => classes.add(className));
        }
      };

      addClass(value);
      return Array.from(classes).join(" ");
    });
  }

  renderStyleAttribute(value: StyleValue): string {
    return this.withPhase(REFACE_EVENT.RENDER.STYLE, () => {
      const styles = new Map<string, string>();

      const addStyle = (val: StyleValue) => {
        if (!val) return;

        if (Array.isArray(val)) {
          val.forEach((v) => addStyle(v));
        } else if (typeof val === "object") {
          Object.entries(val)
            .filter(([, value]) => value !== false && value != null)
            .forEach(([prop, value]) => {
              // Преобразуем camelCase в kebab-case
              const kebabProp = prop.replace(
                /[A-Z]/g,
                (m) => `-${m.toLowerCase()}`,
              );
              styles.set(kebabProp, String(value));
            });
        } else if (typeof val === "string") {
          // Парсим строку стилей
          val.split(";")
            .map((style) => style.trim())
            .filter(Boolean)
            .forEach((style) => {
              const [prop, value] = style.split(":").map((s) => s.trim());
              if (prop && value) {
                styles.set(prop, value);
              }
            });
        }
      };

      addStyle(value);

      return Array.from(styles.entries())
        .map(([prop, value]) => `${prop}: ${value}`)
        .join("; ");
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
