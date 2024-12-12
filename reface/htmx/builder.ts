import type {
  HxAttributes,
  HxConfig,
  HxMethod,
  HxSwapMode,
  HxTrigger,
} from "./types.ts";

export class HxBuilder implements HxBuilder {
  constructor() {}

  private add(key: string, value: string): this {
    this[`hx-${key}`] = value;
    return this;
  }

  private formatTrigger(trigger: HxTrigger): string {
    if (typeof trigger === "string") {
      return trigger;
    }

    const { event, delay, throttle, queue, once, every } = trigger;
    const modifiers: string[] = [];

    if (delay) modifiers.push(`delay:${delay}ms`);
    if (throttle) modifiers.push(`throttle:${throttle}ms`);
    if (queue) modifiers.push(`queue:${queue}`);
    if (once) modifiers.push("once");
    if (every) modifiers.push(`every:${every}ms`);

    return modifiers.length > 0 ? `${event}[${modifiers.join(" ")}]` : event;
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

  trigger(value: HxTrigger | HxTrigger[]): this {
    if (Array.isArray(value)) {
      return this.add(
        "trigger",
        value.map((t) => this.formatTrigger(t)).join(", "),
      );
    }
    return this.add("trigger", this.formatTrigger(value));
  }

  target(selector: string): this {
    return this.add("target", selector);
  }

  swap(value: HxSwapMode): this {
    return this.add("swap", value);
  }

  // ... остальные методы без изменений ...
}
