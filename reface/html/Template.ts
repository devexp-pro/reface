import { createLogger } from "@reface/core";
import type { ElementChildType, IHTMLAttributes } from "./types.ts";
import { TemplateBase } from "./TemplateBase.ts";
import { processAttributes } from "./attributes.ts";
import { TemplateText } from "./TemplateText.ts";
import { TemplateFragment } from "./TemplateFragment.ts";
import { TemplateHtml } from "./TemplateHtml.ts";
import { ITemplate } from "./types.ts";
import { renderAttributes } from "./attributes.ts";
import { VOID_ELEMENTS } from "./constants.ts";
import { escapeHTML } from "./escape.ts";

const logger = createLogger("HTML:Template");

/**
 * HTML template class
 */
export class Template implements ITemplate {
  private readonly children: ElementChildType[];
  private readonly tag: string;
  private readonly attributes: IHTMLAttributes;
  private readonly css?: string;
  private readonly rootClass?: string;
  private readonly script?: string;
  private readonly scriptFile?: string;

  constructor(options: {
    tag: string;
    attributes?: IHTMLAttributes;
    children?: ElementChildType[];
    css?: string;
    rootClass?: string;
    script?: string;
    scriptFile?: string;
  }) {
    this.tag = options.tag;
    this.attributes = options.attributes || {};
    this.children = options.children || [];
    this.css = options.css;
    this.rootClass = options.rootClass;
    this.script = options.script;
    this.scriptFile = options.scriptFile;

    logger.debug("Creating template", {
      tag: this.tag,
      hasAttributes: Boolean(this.attributes),
      childrenCount: this.children.length,
      hasCss: Boolean(this.css),
      hasRootClass: Boolean(this.rootClass),
    });
  }

  addClass(className: string): Template {
    logger.debug("Adding class", { className });
    const currentClasses = this.attributes.class || [];
    return new Template({
      ...this,
      attributes: {
        ...this.attributes,
        class: [...currentClasses, className],
      },
    });
  }

  setAttribute(
    name: keyof IHTMLAttributes,
    value: IHTMLAttributes[keyof IHTMLAttributes],
  ): Template {
    logger.debug("Setting attribute", { name, value });
    return new Template({
      ...this,
      attributes: { ...this.attributes, [name]: value },
    });
  }

  appendChild(child: ElementChildType): Template {
    logger.debug("Appending child", { type: typeof child });
    return new Template({
      ...this,
      children: [...this.children, child],
    });
  }

  setChildren(children: ElementChildType[]): Template {
    logger.debug("Setting children", { count: children.length });
    return new Template({ ...this, children });
  }

  addCss(css: string): Template {
    logger.debug("Adding CSS", { length: css.length });
    return new Template({
      ...this,
      css: this.css ? `${this.css}\n${css}` : css,
    });
  }

  templateLiteral(
    strings: TemplateStringsArray,
    ...values: ElementChildType[]
  ): Template {
    logger.debug("Processing template literal", {
      stringsCount: strings.length,
      valuesCount: values.length,
    });

    try {
      const children = strings.reduce((acc: ElementChildType[], str, i) => {
        if (str) acc.push(str);
        if (i < values.length) acc.push(values[i]);
        return acc;
      }, []);

      return new Template({
        ...this,
        children,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error("Failed to process template literal", error, {
          strings,
          values,
        });
      } else {
        logger.error(
          "Unknown error in template literal",
          new Error(String(error)),
          { strings, values },
        );
      }
      throw error;
    }
  }

  /**
   * Create template from partial data
   */
  static from(
    template: Partial<TemplateBase>,
  ): Template {
    logger.debug("Creating template from partial", {
      tag: template.tag,
      hasAttributes: Boolean(template.attributes),
      childrenCount: template.children?.length,
    });

    return new Template({
      tag: template.tag || "div",
      attributes: template.attributes || {},
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
  static createComponent(
    name: string,
    defaultProps?: Partial<IHTMLAttributes>,
  ) {
    logger.debug("Creating component", {
      name,
      hasDefaultProps: Boolean(defaultProps),
    });

    return Object.assign(
      (props?: IHTMLAttributes) => {
        logger.debug("Component called", {
          name,
          hasProps: Boolean(props),
        });

        return new Template({
          tag: name,
          attributes: { ...defaultProps, ...props },
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
    const propsFunction = (props?: IHTMLAttributes) => {
      logger.debug("Props function called", {
        tag,
        hasProps: Boolean(props),
      });

      const template = new Template({
        tag,
        attributes: props
          ? processAttributes(props as Record<string, unknown>)
          : {},
      });

      // Создаем функцию для template literals
      const templateLiteralFunction = (
        strings: TemplateStringsArray,
        ...values: ElementChildType[]
      ) => {
        logger.debug("Template literal function called", {
          tag,
          stringsCount: strings.length,
          valuesCount: values.length,
        });

        // Собираем массив элементов
        const result: ElementChildType[] = [];

        for (let i = 0; i < strings.length; i++) {
          if (strings[i]) {
            result.push(strings[i]);
          }

          if (i < values.length) {
            const value = values[i];
            if (value != null) {
              if (Array.isArray(value)) {
                result.push(...value);
              } else if (
                value instanceof Template ||
                value instanceof TemplateFragment ||
                value instanceof TemplateHtml
              ) {
                result.push(value);
              } else {
                result.push(new TemplateText(String(value)));
              }
            }
          }
        }

        // Обновляем children шаблона
        return new Template({
          ...template,
          children: result,
        });
      };

      // Возвращаем функцию с метаданными
      return Object.assign(templateLiteralFunction, {
        tag,
        isTemplate: true as const,
      });
    };

    // Возвращаем функцию с метаданными
    return Object.assign(propsFunction, {
      tag,
      isTemplate: true as const,
    });
  }

  toHtml(): string {
    const attrs = renderAttributes(this.attributes);

    if (VOID_ELEMENTS.has(this.tag)) {
      return `<${this.tag}${attrs}/>`;
    }

    const children = this.children.map((child) => {
      if (typeof child === "object" && child !== null && "toHtml" in child) {
        return child.toHtml();
      }

      if (typeof child === "string") {
        return escapeHTML(child);
      }
      if (child instanceof TemplateText) {
        return child.toHtml();
      }
      return escapeHTML(String(child));
    }).join("");

    return `<${this.tag}${attrs}>${children}</${this.tag}>`;
  }
}
