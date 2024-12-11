import { createLogger } from "@reface/core";
import { Template, TemplateComponent, TemplateText } from "@reface/html";
import type { ElementChildType } from "@reface/html";
import type { IslandTrigger } from "./types.ts";
import { API_PATH, TemplateIsland } from "./TemplateIsland.ts";

const logger = createLogger("Island");

export class Island<T = unknown> {
  constructor(
    private handler: () => Promise<T>,
    private name?: string,
  ) {
    logger.debug("Island created", { name });
    return this.createProxy();
  }

  private createProxy() {
    const proxy = function (
      this: Island<T>,
      props?: Record<string, unknown> | undefined,
      children?: ElementChildType[],
    ) {
      if (!props && !children) {
        return (
          strings?: TemplateStringsArray,
          ...values: ElementChildType[]
        ) => {
          if (strings) {
            return this.toTemplateLiteral(strings, values);
          }
          return this.toTemplate([]);
        };
      }

      if (props && "raw" in props) {
        return this.toTemplateLiteral(
          props as unknown as TemplateStringsArray,
          children || [],
        );
      }

      return this.toTemplate(children || [], props || {});
    }.bind(this);

    // Методы
    Object.defineProperties(proxy, {
      trigger: {
        value: this.trigger.bind(this),
      },
      execute: {
        value: this.execute.bind(this),
      },
    });

    return proxy;
  }

  private toTemplate(
    children: ElementChildType[] = [],
    props: Record<string, unknown> = {},
  ): TemplateComponent {
    return new TemplateIsland(
      this.name || "",
      this.handler,
      props,
      children,
    );
  }

  private toTemplateLiteral(
    strings: TemplateStringsArray,
    values: ElementChildType[],
  ): TemplateComponent {
    const children = strings.map((str, i) => {
      const parts: ElementChildType[] = [];

      if (str) {
        parts.push(new TemplateText(str));
      }

      if (i < values.length) {
        parts.push(values[i]);
      }

      return parts;
    }).flat();

    return this.toTemplate(children);
  }

  trigger(trigger: IslandTrigger): Record<string, string> {
    if (!trigger) return {};

    if (typeof trigger === "string") {
      return {
        "hx-trigger": trigger,
        "hx-get": `${API_PATH}/${this.name}`,
        "hx-target": `[data-island="${this.name}"]`,
      };
    }

    if (Array.isArray(trigger)) {
      return { "hx-trigger": trigger.join(", ") };
    }

    const parts: string[] = [];

    if (trigger.event) parts.push(trigger.event);
    if (trigger.every) {
      const timing = typeof trigger.every === "number"
        ? `${trigger.every}s`
        : trigger.every;
      parts.push(`every ${timing}`);
    }
    if (trigger.filter) parts.push(`[${trigger.filter}]`);
    if (trigger.changed) parts.push("changed");
    if (trigger.once) parts.push("once");
    if (trigger.delay) {
      const delay = typeof trigger.delay === "number"
        ? `${trigger.delay}s`
        : trigger.delay;
      parts.push(`delay:${delay}`);
    }
    if (trigger.from) parts.push(`from:${trigger.from}`);
    if (trigger.target) parts.push(`target:${trigger.target}`);

    return { "hx-trigger": parts.join(" ") };
  }

  async execute(): Promise<T> {
    logger.debug("Island handler called");
    return this.handler();
  }
}

export function island<T>(
  handler: () => Promise<T>,
  name?: string,
): Island<T> & {
  (
    props?: Record<string, unknown>,
    children?: ElementChildType[],
  ): TemplateComponent;
  (): (
    strings: TemplateStringsArray,
    ...values: ElementChildType[]
  ) => TemplateComponent;
} {
  return new Island(handler, name) as any;
}
