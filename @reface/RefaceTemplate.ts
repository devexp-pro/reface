import type {
  ElementChildType,
  HTMLAttributes,
  IRefaceRenderManager,
  IRefaceTemplate,
} from "@reface/types";
import { escapeHTML } from "./utils/escape.ts";
import { VOID_ELEMENTS } from "./constants.ts";

export class RefaceTemplate<
  A extends HTMLAttributes = HTMLAttributes,
  P extends Record<string, unknown> = Record<string, unknown>,
> implements IRefaceTemplate<A, P> {
  static readonly type = "base";
  children: ElementChildType[] = [];
  attributes: A = {} as A;
  tag?: string;
  payload?: P;
  transformer?: (
    attributes: A,
    children: ElementChildType[],
  ) => ElementChildType[];
  protected proxy?: this;
  protected type: string = "base";

  constructor(data?: {
    children?: ElementChildType[];
    attributes?: A;
    payload?: P;
    tag?: string;
    type?: string;
    transformer?: (
      attributes: A,
      children: ElementChildType[],
    ) => ElementChildType[];
  }) {
    this.type = (this.constructor as typeof RefaceTemplate).type || this.type;

    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        this[key] = value;
      });
    }

    const self = this;
    this.proxy = new Proxy(function () {}, {
      apply(_target, _thisArg, args) {
        return self.call(...args);
      },
      get(_target, prop) {
        // FIXME: это костыль, потому что в Proxy нет доступа к прототипу
        if (prop in _target) {
          return _target[prop];
        }
        return self[prop];
      },
      set(_target, prop, value) {
        self[prop] = value;
        return true;
      },
    }) as unknown as this;

    return this.proxy;
  }

  protected transformChildren(
    strings: TemplateStringsArray | string,
    values: ElementChildType[] = [],
  ): ElementChildType[] {
    const children: ElementChildType[] = [];
    if (typeof strings === "string") {
      children.push(new RefaceTemplate({ children: [strings.trim()] }));

      if (this.transformer) {
        const transformed = this.transformer(this.attributes, children || []);
        return Array.isArray(transformed) ? transformed : [transformed];
      }

      return children;
    }

    for (let i = 0; i < strings.length; i++) {
      const trimmed = strings[i];
      if (trimmed) {
        children.push(new RefaceTemplate({ children: [trimmed] }));
      }

      if (i < values.length) {
        const value = values[i];
        if (Array.isArray(value)) {
          children.push(...value);
        } else if (this.isTemplate(value)) {
          children.push(value);
        } else if (
          typeof value === "boolean" ||
          value === null ||
          value === undefined ||
          value === ""
        ) {
          // do nothing
        } else if (!this.isEmptyValue(value)) {
          children.push(
            new RefaceTemplate({ children: [escapeHTML(String(value))] }),
          );
        }
      }
    }

    if (this.transformer) {
      const transformed = this.transformer(this.attributes, children || []);
      return Array.isArray(transformed) ? transformed : [transformed];
    }

    return children;
  }

  protected isTemplate(value: unknown): value is IRefaceTemplate {
    return typeof value === "function" && !!value.type;
  }

  protected isEmptyValue(value: unknown): boolean {
    return value === null || value === undefined || value === false;
  }

  private call(
    stringsOrAttrs: TemplateStringsArray | A,
    ...values: any[]
  ): this {
    if (stringsOrAttrs && "raw" in stringsOrAttrs) {
      return new (this.constructor as new (...args: any[]) => this)({
        tag: this.tag,
        payload: this.payload,
        type: this.type,
        children: this.setChildren(
          this.transformChildren(stringsOrAttrs, values),
        ),
        attributes: { ...this.attributes },
        transformer: this.transformer,
      });
    }

    return new (this.constructor as new (...args: any[]) => this)({
      tag: this.tag,
      payload: this.payload,
      type: this.type,
      children: [...this.children],
      attributes: this.setAttributes(stringsOrAttrs as A),
      transformer: this.transformer,
    });
  }

  protected normalizeClassValue(value: ClassValue): string[] {
    const classes = new Set<string>();

    const addClass = (val: ClassValue) => {
      if (!val) return;

      if (Array.isArray(val)) {
        val.forEach((v) => addClass(v));
      } else if (typeof val === "object" && val !== null) {
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
    return Array.from(classes);
  }

  setAttributes(attrs: A): A {
    const merged = { ...this.attributes, ...attrs };

    // Если есть класс, нормализуем его
    if ("class" in merged) {
      merged.class = this.normalizeClassValue(merged.class);
    }

    return merged;
  }

  setChildren(children: ElementChildType[]) {
    return children;
  }

  toHtml(manager: IRefaceRenderManager): string {
    const content = manager.renderChildren(this.children || []);
    if (!this.tag) {
      return content;
    }

    const attrs = manager.renderAttributes(this.attributes);

    if (VOID_ELEMENTS.has(this.tag)) {
      return `<${this.tag}${attrs ? ` ${attrs}` : ""}/>`;
    }

    return `<${this.tag}${attrs ? ` ${attrs}` : ""}>${content}</${this.tag}>`;
  }
}
