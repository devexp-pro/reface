import { createLogger } from "@reface/core";
import type { ElementChildType, IHTMLAttributes } from "./types.ts";
import { TemplateBase } from "./TemplateBase.ts";
import { processAttributes } from "./attributes.ts";
import { escapeHTML } from "./escape.ts";

const logger = createLogger("HTML:Template");

/**
 * Main template class for DOM elements
 */
export class Template<P extends IHTMLAttributes = IHTMLAttributes>
  extends TemplateBase<P> {
  constructor(options: {
    tag: string;
    attributes?: P;
    children?: ElementChildType[];
    css?: string;
    rootClass?: string;
    script?: string;
    scriptFile?: string;
  }) {
    if (options.attributes?.class) {
      options.attributes.class = Array.isArray(options.attributes.class)
        ? options.attributes.class
        : options.attributes.class.split(/\s+/).filter(Boolean);
    }
    super(options);
  }

  addClass(className: string): Template<P> {
    const currentClasses = this.attributes.class || [];
    return new Template<P>({
      ...this,
      attributes: {
        ...this.attributes,
        class: [...currentClasses, className],
      },
    });
  }

  setAttribute(name: keyof P, value: P[keyof P]): Template<P> {
    return new Template<P>({
      ...this,
      attributes: { ...this.attributes, [name]: value },
    });
  }

  appendChild(child: ElementChildType): Template<P> {
    return new Template<P>({
      ...this,
      children: [...this.children, child],
    });
  }

  setChildren(children: ElementChildType[]): Template<P> {
    return new Template<P>({ ...this, children });
  }

  addCss(css: string): Template<P> {
    return new Template<P>({
      ...this,
      css: this.css ? `${this.css}\n${css}` : css,
    });
  }

  templateLiteral(
    strings: TemplateStringsArray,
    ...values: ElementChildType[]
  ): Template<P> {
    const children = strings.reduce((acc: ElementChildType[], str, i) => {
      if (str) acc.push(escapeHTML(str));

      if (i < values.length) {
        const value = values[i];
        if (value instanceof TemplateBase) {
          acc.push(value);
        } else {
          acc.push(escapeHTML(String(value)));
        }
      }
      return acc;
    }, []);

    return new Template<P>({
      ...this,
      children,
    });
  }

  /**
   * Create template from partial data
   */
  static from<T extends IHTMLAttributes>(
    template: Partial<ITemplateBase<T>>,
  ): Template<T> {
    return new Template<T>({
      tag: template.tag || "div",
      attributes: template.attributes || {} as T,
      children: template.children || [],
      css: template.css || "",
      rootClass: template.rootClass || "",
      script: template.script,
      scriptFile: template.scriptFile,
    });
  }

  /**
   * Create component with typed props
   */
  static createComponent<T extends IHTMLAttributes>(
    name: string,
    defaultProps?: Partial<T>,
  ) {
    return Object.assign(
      (props?: T) => {
        return new Template<T>({
          tag: name,
          attributes: { ...defaultProps, ...props } as T,
        });
      },
      {
        isTemplate: true as const,
        tag: name,
      },
    );
  }

  /**
   * Create template function with template literals support
   */
  static createTemplateFunction(tag: string) {
    return Object.assign(
      <T extends IHTMLAttributes>(
        propsOrStrings?: T | TemplateStringsArray,
        ...values: ElementChildType[]
      ) => {
        const template = new Template<T>({ tag });

        if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
          return template.templateLiteral(propsOrStrings, ...values);
        }

        return new Template<T>({
          ...template,
          attributes: propsOrStrings
            ? processAttributes(propsOrStrings as Record<string, unknown>) as T
            : {} as T,
        });
      },
      {
        tag,
        isTemplate: true as const,
      },
    );
  }
}
