import type {
  HxAttributes,
  HxConfig,
  HxMethod,
  HxSelectMode,
  HxSwapMode,
  HxTrigger,
} from "./types.ts";

export class HxBuilder implements HxAttributes {
  constructor() {}

  private add(key: string, value: string): this {
    this[`hx-${key}`] = value;
    return this;
  }

  private formatTrigger(trigger: HxTrigger): string {
    if (Array.isArray(trigger)) {
      return trigger.map((t) => this.formatTrigger(t)).join(", ");
    }

    if (typeof trigger === "string") {
      return trigger;
    }

    const { event, polling, modifiers = {} } = trigger;
    const parts: string[] = [];

    // Базовое событие или polling
    parts.push(polling || event);

    // Фильтр события
    if (modifiers.filter) {
      parts.push(`[${modifiers.filter}]`);
    }

    // Модификаторы
    const mods: string[] = [];

    if (modifiers.once) mods.push("once");
    if (modifiers.changed) mods.push("changed");
    if (modifiers.delay) mods.push(`delay:${modifiers.delay}ms`);
    if (modifiers.throttle) mods.push(`throttle:${modifiers.throttle}ms`);
    if (modifiers.from) mods.push(`from:${modifiers.from}`);
    if (modifiers.target) mods.push(`target:${modifiers.target}`);
    if (modifiers.consume) mods.push("consume");
    if (modifiers.queue) mods.push(`queue:${modifiers.queue}`);
    if (modifiers.intersect) {
      mods.push(...modifiers.intersect);
    }

    if (mods.length > 0) {
      parts.push(mods.join(" "));
    }

    return parts.join(" ");
  }

  get(url: string): this {
    return this.add("get", url);
  }

  post(url: string): this {
    return this.add("post", url);
  }

  put(url: string): this {
    return this.add("put", url);
  }

  patch(url: string): this {
    return this.add("patch", url);
  }

  delete(url: string): this {
    return this.add("delete", url);
  }

  trigger(value: HxTrigger): this {
    return this.add("trigger", this.formatTrigger(value));
  }

  target(selector: string): this {
    return this.add("target", selector);
  }

  swap(value: HxSwapMode): this {
    return this.add("swap", value);
  }

  on(event: string, script: string): this {
    this[`hx-on:${event}`] = script;
    return this;
  }

  pushUrl(url: string | boolean): this {
    return this.add("push-url", String(url));
  }

  select(selector: string): this {
    return this.add("select", selector);
  }

  selectOob(selector: string): this {
    return this.add("select-oob", selector);
  }

  swapOob(value: string): this {
    return this.add("swap-oob", value);
  }

  vals(values: Record<string, unknown>): this {
    return this.add("vals", JSON.stringify(values));
  }

  // ... остальные методы без изменений ...
}
