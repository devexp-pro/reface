import type {
  ElementChild,
  ITemplate,
  TemplateAttributes,
  TemplateLiteralFunction,
} from "./types.ts";
import { processAttributes } from "./attributes.ts";

function processElementChildren(
  strings: TemplateStringsArray,
  values: ElementChild[],
): ElementChild[] {
  return strings.reduce((acc: ElementChild[], str, i) => {
    if (str) acc.push(str);
    if (i < values.length) acc.push(values[i]);
    return acc;
  }, []);
}

export class Template implements ITemplate {
  readonly isTemplate = true as const;
  readonly tag: string;
  readonly attributes: TemplateAttributes;
  readonly children: ElementChild[];
  readonly css: string;
  readonly rootClass: string;
  readonly script?: string;
  readonly scriptFile?: string;

  constructor({
    tag,
    attributes = {},
    children = [],
    css = "",
    rootClass = "",
    script,
    scriptFile,
  }: {
    tag: string;
    attributes?: TemplateAttributes;
    children?: ElementChild[];
    css?: string;
    rootClass?: string;
    script?: string;
    scriptFile?: string;
  }) {
    this.tag = tag;
    this.attributes = attributes;
    this.children = children;
    this.css = css;
    this.rootClass = rootClass;
    this.script = script;
    this.scriptFile = scriptFile;
  }

  addClass(className: string): Template {
    const newAttributes = {
      ...this.attributes,
      class: this.attributes.class
        ? `${this.attributes.class} ${className}`
        : className,
    };
    return new Template({ ...this, attributes: newAttributes });
  }

  setAttribute(name: string, value: unknown): Template {
    return new Template({
      ...this,
      attributes: { ...this.attributes, [name]: value },
    });
  }

  appendChild(child: ElementChild): Template {
    return new Template({
      ...this,
      children: [...this.children, child],
    });
  }

  setChildren(children: ElementChild[]): Template {
    return new Template({ ...this, children });
  }

  addCss(css: string): Template {
    return new Template({
      ...this,
      css: this.css ? `${this.css}\n${css}` : css,
    });
  }

  templateLiteral(
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ): Template {
    const children = strings.reduce((acc: ElementChild[], str, i) => {
      if (str) acc.push(str);
      if (i < values.length) acc.push(values[i]);
      return acc;
    }, []);

    return new Template({
      tag: this.tag,
      attributes: this.attributes,
      children,
      css: this.css,
      rootClass: this.rootClass,
      script: this.script,
      scriptFile: this.scriptFile,
    });
  }

  /**
   * Создает новый шаблон на основе существующего с дополнительными свойствами
   */
  static from(template: Partial<ITemplate>): Template {
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
   * Создает функцию-шаблон с поддержкой template literals
   */
  static createTemplateFunction(tag: string): TemplateLiteralFunction {
    function templateFn(
      propsOrStrings?: Record<string, unknown> | TemplateStringsArray,
      ...values: ElementChild[]
    ): ITemplate | TemplateLiteralFunction {
      // Создаем базовый шаблон
      const template = new Template({
        tag,
        attributes: {},
        children: [],
      });

      // Template literal call: div`Hello`
      if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
        const strings = propsOrStrings as TemplateStringsArray;
        return template.templateLiteral(strings, ...values);
      }

      // Props call: div({class: 'test'})
      const withProps = new Template({
        ...template,
        attributes: propsOrStrings
          ? processAttributes(propsOrStrings as Record<string, unknown>)
          : {},
      });

      // Создаем функцию для поддержки template literals
      const fn = (
        strings: TemplateStringsArray,
        ...templateValues: ElementChild[]
      ) => {
        return withProps.templateLiteral(strings, ...templateValues);
      };

      // Добавляем свойства для поддержки template literals
      return Object.assign(fn, {
        isTemplate: true as const,
        tag,
      });
    }

    // Добавляем свойства для поддержки template literals
    return Object.assign(templateFn, {
      isTemplate: true as const,
      tag,
      // Добавляем поддержку прямого вызова template literals
      templateLiteral: (
        strings: TemplateStringsArray,
        ...values: ElementChild[]
      ) => {
        return new Template({
          tag,
          attributes: {},
          children: processElementChildren(strings, values),
        });
      },
    });
  }
}

// Добавляем поддержку вызова как template literal function
export interface Template {
  templateLiteral: (
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ) => Template;
}
