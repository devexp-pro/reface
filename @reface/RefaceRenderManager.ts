import {
  type ClassValue,
  type ElementChildType,
  type HTMLAttributes,
  isTemplate,
  type StyleValue,
  type Template,
  type TemplateAttributes,
} from "./template/mod.ts";
import { isEmptyValue } from "./utils/renderUtils.ts";
import { REFACE_EVENT } from "./constants.ts";
import type { RefaceComposer } from "./RefaceComposer.ts";

export class RefaceRenderManager implements RenderManager {
  private handlers = new Map<RefaceEventType, Set<Function>>();
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

  render(template: Template): string {
    return this.withPhase(
      REFACE_EVENT.RENDER.RENDER,
      this.renderImpl,
      template,
    );
  }

  private renderImpl(template: Template): string {
    if (isTemplate(template)) {
      return this.renderTemplate(template);
    }
    throw new Error("Invalid template");
  }

  renderTemplate(template: Template): string {
    return this.withPhase(
      REFACE_EVENT.RENDER.TEMPLATE,
      this.renderTemplateImpl,
      template,
    );
  }

  private renderTemplateImpl(template: Template): string {
    const content = this.renderChildren(template.raw.children);
    if (!template.raw.tag) return content;

    const attrs = this.renderAttributes(template.raw.attributes);
    if (template.raw.void) {
      return `<${template.raw.tag}${attrs ? ` ${attrs}` : ""}/>`;
    }
    return `<${template.raw.tag}${
      attrs ? ` ${attrs}` : ""
    }>${content}</${template.raw.tag}>`;
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

  renderChildren(children: ElementChildType[] = []): string {
    return this.withPhase(
      REFACE_EVENT.RENDER.CHILDREN,
      this.renderChildrenImpl,
      children,
    );
  }

  private renderChildrenImpl(children: ElementChildType[] = []): string {
    return children.map((child) => this.renderChild(child)).join("");
  }

  renderAttributes(attrs: HTMLAttributes): string {
    return this.withPhase(REFACE_EVENT.RENDER.ATTRIBUTES, ({ attrs }) => {
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
    }, { attrs });
  }

  renderClassAttribute(value: ClassValue): string {
    return this.withPhase(REFACE_EVENT.RENDER.CLASS, ({ classValue }) => {
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
    }, { classValue: value });
  }

  renderStyleAttribute(value: StyleValue): string {
    return this.withPhase(REFACE_EVENT.RENDER.STYLE, ({ styleValue }) => {
      const styles = new Map<string, string>();

      const addStyle = (val: StyleValue) => {
        if (!val) return;

        if (Array.isArray(val)) {
          val.forEach((v) => addStyle(v));
        } else if (typeof val === "object") {
          Object.entries(val)
            .filter(([, value]) => value !== false && value != null)
            .forEach(([prop, value]) => {
              const kebabProp = prop.replace(
                /[A-Z]/g,
                (m) => `-${m.toLowerCase()}`,
              );
              styles.set(kebabProp, String(value));
            });
        } else if (typeof val === "string") {
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
    }, { styleValue: value });
  }

  on(event: RefaceEventType, handler: RenderHandler): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler);
  }

  off(event: RefaceEventType, handler: RenderHandler): void {
    this.handlers.get(event)?.delete(handler);
  }

  private runHandlers(
    event: RefaceEventType,
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
