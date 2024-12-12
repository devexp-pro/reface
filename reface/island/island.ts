import { createLogger } from "@reface/core";
import { type TemplateComponent, TemplateText } from "@reface/html";
import type { ElementChildType } from "@reface/html";
import { TemplateIsland } from "./TemplateIsland.ts";
import { ISLAND_API_PREFIX, ISLAND_HTML_ATTRIBUTE } from "./constants.ts";
import { hx, type HxBuilder, type HxTrigger } from "@reface/htmx";

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

  trigger(trigger: HxTrigger): HxBuilder {
    return hx()
      .get(`${ISLAND_API_PREFIX}/${this.name}`)
      .target(`[${ISLAND_HTML_ATTRIBUTE}="${this.name}"]`)
      .trigger(trigger);
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
