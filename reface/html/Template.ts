import { createLogger } from "@reface/core";
import type { ElementChildType, IHTMLAttributes } from "./types.ts";
import { TemplateBase } from "./TemplateBase.ts";
import { processAttributes } from "./attributes.ts";
import { TemplateText } from "./TemplateText.ts";

const logger = createLogger("HTML:Template");

/**
 * HTML template class
 */
export class Template<T extends IHTMLAttributes = IHTMLAttributes>
  extends TemplateBase {
  constructor(options: {
    tag: string;
    attributes?: T;
    children?: ElementChildType[];
    css?: string;
    rootClass?: string;
    script?: string;
    scriptFile?: string;
  }) {
    super({
      ...options,
      children: options.children?.map((child) => {
        // Если это примитив, оборачиваем в TemplateText
        if (child == null || typeof child !== "object") {
          return TemplateText.from(child);
        }
        return child;
      }),
    });

    logger.debug("Creating template", {
      tag: options.tag,
      hasAttributes: Boolean(options.attributes),
      childrenCount: options.children?.length,
      hasCss: Boolean(options.css),
      hasRootClass: Boolean(options.rootClass),
    });
  }

  addClass(className: string): Template<T> {
    logger.debug("Adding class", { className });
    const currentClasses = this.attributes.class || [];
    return new Template<T>({
      ...this,
      attributes: {
        ...this.attributes,
        class: [...currentClasses, className],
      },
    });
  }

  setAttribute(name: keyof T, value: T[keyof T]): Template<T> {
    logger.debug("Setting attribute", { name, value });
    return new Template<T>({
      ...this,
      attributes: { ...this.attributes, [name]: value },
    });
  }

  appendChild(child: ElementChildType): Template<T> {
    logger.debug("Appending child", {
      type: typeof child,
      isTemplate: child instanceof TemplateBase,
    });
    return new Template<T>({
      ...this,
      children: [...this.children, child],
    });
  }

  setChildren(children: ElementChildType[]): Template<T> {
    logger.debug("Setting children", { count: children.length });
    return new Template<T>({ ...this, children });
  }

  addCss(css: string): Template<T> {
    logger.debug("Adding CSS", { length: css.length });
    return new Template<T>({
      ...this,
      css: this.css ? `${this.css}\n${css}` : css,
    });
  }

  templateLiteral(
    strings: TemplateStringsArray,
    ...values: ElementChildType[]
  ): Template<T> {
    logger.debug("Processing template literal", {
      stringsCount: strings.length,
      valuesCount: values.length,
    });

    try {
      const children = strings.reduce((acc: ElementChildType[], str, i) => {
        // Создаем TemplateText для строковой части
        if (str) acc.push(new TemplateText(str));

        if (i < values.length) {
          const value = values[i];
          if (value instanceof TemplateBase) {
            acc.push(value);
          } else {
            // Оборачиваем значение в TemplateText
            acc.push(TemplateText.from(value));
          }
        }
        return acc;
      }, []);

      return new Template<T>({
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
