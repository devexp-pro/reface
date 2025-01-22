import type { EmptyRecord } from "@common/utility.types.ts";
import type { ExpressionInterface, RenderContext } from "../Expression.ts";
import { ExpressionProxy } from "../ExpressionProxy.ts";
import { Child, PROXY_COPY, PROXY_PAYLOAD } from "../types.ts";
import type {
  ElementNode,
  ElementPayload,
  NormalizedAttributes,
} from "./types.ts";
import {
  DOUBLE_QUOTE,
  DOUBLE_QUOTE_ENTITIES,
  SINGLE_QUOTE,
  SINGLE_QUOTE_ENTITIES,
  SVG_CAMEL_CASE_ATTRIBUTES,
  VOID_ELEMENTS,
} from "./constants.ts";
import type { HTMLAttributes, HTMLElementTagAttributes } from "./html.types.ts";
import type { RenderOptions } from "@recast/recast/mod.ts";

class ElementExpression<
  Attrs extends HTMLAttributes = HTMLAttributes,
  Methods extends Record<string, any> = EmptyRecord,
  T extends ElementNode<Attrs, Methods> = ElementNode<Attrs, Methods>,
> extends ExpressionProxy<ElementPayload, Attrs, Methods>
  implements ExpressionInterface<T> {
  readonly type = "element" as const;

  is(value: unknown): value is T {
    return (value as T)?.[PROXY_PAYLOAD]?.type === this.type;
  }

  render({
    node,
    context,
  }: {
    node: T;
    context: RenderContext;
    userContext?: RenderOptions;
  }): string {
    const { tag, attributes, children, void: isVoid } = node[PROXY_PAYLOAD];
    const attrs = this.renderAttributes(attributes);

    if (isVoid) {
      return `<${tag}${attrs}/>`;
    }

    const renderedChildren = children
      .map((child) => context.render(child as Child))
      .join("");

    return `<${tag}${attrs}>${renderedChildren}</${tag}>`;
  }

  // @ts-ignore FIXME
  create<Methods extends Record<string, any> = EmptyRecord>(
    value:
      & { tag: keyof HTMLElementTagAttributes; attributes?: HTMLAttributes }
      & Partial<Omit<ElementPayload, "tag" | "attributes">>,
  ): ElementNode<HTMLElementTagAttributes[typeof value.tag], Methods> {
    const node: ElementPayload = {
      type: this.type,
      tag: value.tag as string,
      attributes: this.normalizeAttributes(value.attributes),
      children: value.children || [],
      meta: value.meta || {},
      void: VOID_ELEMENTS.has(value.tag as string),
      methods: value.methods || {},
    };

    // @ts-expect-error FIXME
    return this.proxyify(node);
  }

  copy(
    template: T,
    newPayload?:
      | Partial<ElementPayload>
      | ((payload: ElementPayload) => ElementPayload),
  ): T {
    // TODO: create and use copy function

    if (typeof newPayload === "function") {
      return template[PROXY_COPY](newPayload) as T;
    }

    return template[PROXY_COPY]((payload) => {
      return {
        type: this.type,
        tag: newPayload?.tag || payload.tag,
        attributes: { ...newPayload?.attributes, ...payload.attributes },
        children: [...payload.children],
        meta: { ...newPayload?.meta, ...payload.meta },
        void: newPayload?.void || payload.void,
        methods: { ...newPayload?.methods, ...payload.methods },
      };
    }) as T;
  }

  public camelToKebab(str: string): string {
    // FIXME: seporate attribute and style processing
    if (str.startsWith("--") || str.startsWith("data-")) return str;
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }

  public escapeAttribute(str: string, useSingleQuotes: boolean): string {
    const entities = useSingleQuotes
      ? SINGLE_QUOTE_ENTITIES
      : DOUBLE_QUOTE_ENTITIES;
    const pattern = useSingleQuotes ? /['&]/g : /["&]/g;
    return str.replace(pattern, (char) => entities[char]);
  }

  override proccessAttributes(
    payload: ElementPayload,
    attrs: Attrs,
  ): NormalizedAttributes {
    return {
      ...payload.attributes,
      ...this.normalizeAttributes(attrs),
    };
  }

  processStyleString(styleStr: string) {
    const styles: Record<string, string> = {};
    styleStr.split(";").forEach((style) => {
      const [prop, value] = style.split(":").map((s) => s.trim());
      if (prop && value) {
        styles[this.camelToKebab(prop)] = value;
      }
    });
    return styles;
  }

  public normalizeAttributes(attrs?: HTMLAttributes): NormalizedAttributes {
    const result: NormalizedAttributes = {
      class: [],
      style: {},
    };

    if (!attrs || typeof attrs !== "object") {
      return result;
    }

    const source = attrs as Record<string, unknown>;

    // Handle class
    if (source.className != null || source.class != null) {
      result.class = this.processClasses(source.className ?? source.class);
    }

    // Handle style
    if (source.style) {
      result.style = this.processStyles(source.style);
    }

    // Handle other attributes
    for (const [key, value] of Object.entries(source)) {
      // FIXME: remove check className
      if (key === "class" || key === "className" || key === "style") continue;

      const normalizedKey = SVG_CAMEL_CASE_ATTRIBUTES.has(key)
        ? key
        : this.camelToKebab(key);

      if (value === true) {
        result[normalizedKey] = true;
      } else if (typeof value === "string") {
        result[normalizedKey] = value;
      } else if (typeof value === "number") {
        result[normalizedKey] = value.toString();
      }
    }

    return result;
  }

  private renderAttributes(attrs: NormalizedAttributes): string {
    const parts: string[] = [];

    for (const [key, value] of Object.entries(attrs)) {
      if (value == null) continue;
      if (value === true) {
        parts.push(key);
        continue;
      }

      let normalizedValue: string | undefined;

      // Handle class arrays
      if (key === "class" && Array.isArray(value)) {
        if (value.length > 0) {
          normalizedValue = [...new Set(value)].join(" ");
        } else {
          continue;
        }
      }

      // Handle style objects
      if (key === "style" && typeof value === "object") {
        const styles = Object.entries(value)
          .map(([k, v]) => `${k}: ${v}`)
          .join("; ");

        if (styles) {
          normalizedValue = styles;
        } else {
          continue;
        }
      }

      // Handle regular string attributes
      if (
        typeof value === "string" ||
        typeof value === "number" ||
        normalizedValue
      ) {
        const attrValue = normalizedValue || value.toString();
        const hasDoubleQuotes = attrValue.includes(DOUBLE_QUOTE);
        const quotes = hasDoubleQuotes ? SINGLE_QUOTE : DOUBLE_QUOTE;
        parts.push(
          `${key}=${quotes}${
            this.escapeAttribute(attrValue, hasDoubleQuotes)
          }${quotes}`,
        );
      }
    }

    return parts.length > 0 ? " " + parts.join(" ") : "";
  }
  private processClasses(classValue: unknown): string[] {
    const classes = new Set<string>();

    if (Array.isArray(classValue)) {
      classValue.forEach((c) => {
        this.processClasses(c).forEach((cls) => classes.add(cls));
      });
    } else if (typeof classValue === "object" && classValue !== null) {
      Object.entries(classValue).forEach(([key, value]) => {
        if (value && typeof key === "string") classes.add(key);
      });
    } else if (typeof classValue === "string") {
      classValue.split(/\s+/).forEach((c) => c && classes.add(c));
    }

    return Array.from(classes);
  }
  private processStyles(styleValue: unknown): Record<string, string> {
    const styles: Record<string, string> = {};

    if (Array.isArray(styleValue)) {
      styleValue.forEach((style) => {
        Object.assign(styles, this.processStyles(style));
      });
    } else if (typeof styleValue === "string") {
      Object.assign(styles, this.processStyleString(styleValue));
    } else if (typeof styleValue === "object" && styleValue !== null) {
      Object.entries(styleValue).forEach(([prop, value]) => {
        if (typeof value === "string" || typeof value === "number") {
          styles[this.camelToKebab(prop)] = value.toString();
        }
      });
    }

    return styles;
  }
}

export const elementExpression = new ElementExpression();
