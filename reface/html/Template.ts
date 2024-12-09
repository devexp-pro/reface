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
    logger.debug("Creating template", {
      tag: options.tag,
      hasAttributes: Boolean(options.attributes),
      childrenCount: options.children?.length,
      hasCss: Boolean(options.css),
      hasRootClass: Boolean(options.rootClass),
    });

    if (options.attributes?.class) {
      options.attributes.class = Array.isArray(options.attributes.class)
        ? options.attributes.class
        : options.attributes.class.split(/\s+/).filter(Boolean);
    }
    super(options);
  }

  addClass(className: string): Template<P> {
    logger.debug("Adding class", { className });
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
    logger.debug("Setting attribute", { name, value });
    return new Template<P>({
      ...this,
      attributes: { ...this.attributes, [name]: value },
    });
  }

  appendChild(child: ElementChildType): Template<P> {
    logger.debug("Appending child", {
      type: typeof child,
      isTemplate: child instanceof TemplateBase,
    });
    return new Template<P>({
      ...this,
      children: [...this.children, child],
    });
  }

  setChildren(children: ElementChildType[]): Template<P> {
    logger.debug("Setting children", { count: children.length });
    return new Template<P>({ ...this, children });
  }

  addCss(css: string): Template<P> {
    logger.debug("Adding CSS", { length: css.length });
    return new Template<P>({
      ...this,
      css: this.css ? `${this.css}\n${css}` : css,
    });
  }

  templateLiteral(
    strings: TemplateStringsArray,
    ...values: ElementChildType[]
  ): Template<P> {
    logger.debug("Processing template literal", {
      stringsCount: strings.length,
      valuesCount: values.length,
    });

    try {
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
  static from<T extends IHTMLAttributes>(
    template: Partial<TemplateBase<T>>,
  ): Template<T> {
    logger.debug("Creating template from partial", {
      tag: template.tag,
      hasAttributes: Boolean(template.attributes),
      childrenCount: template.children?.length,
    });

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
    logger.debug("Creating component", {
      name,
      hasDefaultProps: Boolean(defaultProps),
    });

    return Object.assign(
      (props?: T) => {
        logger.debug("Component called", {
          name,
          hasProps: Boolean(props),
        });

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
    const propsFunction = <T extends IHTMLAttributes>(props?: T) => {
      logger.debug("Props function called", {
        tag,
        hasProps: Boolean(props),
      });

      const template = new Template<T>({ tag });

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

        return template.templateLiteral(strings, ...values);
      };

      // Если есть props, применяем их
      if (props) {
        const processed = processAttributes(
          props as Record<string, unknown>,
        ) as T;
        template.attributes = processed;
      }

      // Возвращаем функцию с поддержкой template literals
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
}
