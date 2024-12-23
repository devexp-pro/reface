import type { HxSwapMode, HxTrigger, IHxBuilder } from "./types.ts";

export class HxBuilder implements IHxBuilder {
  set(key: string, value: string): this {
    // @ts-expect-error TODO: dont know how to fix this, custom interator is not working
    this[`hx-${key}`] = value;
    return this;
  }

  get(url: string): this {
    return this.set("get", url);
  }

  post(url: string): this {
    return this.set("post", url);
  }

  put(url: string): this {
    return this.set("put", url);
  }

  patch(url: string): this {
    return this.set("patch", url);
  }

  delete(url: string): this {
    return this.set("delete", url);
  }

  trigger(value: HxTrigger): this {
    return this.set("trigger", this.formatTrigger(value));
  }

  target(selector: string): this {
    return this.set("target", selector);
  }

  swap(value: HxSwapMode): this {
    return this.set("swap", value);
  }

  on(event: string, script: string): this {
    return this.set(`on:${event}`, script);
  }

  pushUrl(url: string | boolean): this {
    return this.set("push-url", String(url));
  }

  select(selector: string): this {
    return this.set("select", selector);
  }

  selectOob(selector: string): this {
    return this.set("select-oob", selector);
  }

  swapOob(value: string): this {
    return this.set("swap-oob", value);
  }

  vals(values: Record<string, unknown>): this {
    return this.set("vals", JSON.stringify(values));
  }

  formatTrigger(trigger: HxTrigger): string {
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
}
