import {
  Template,
  TemplateFragment,
  TemplateHtml,
  TemplateText,
} from "@reface/html";
import type { ElementChildType, IHTMLAttributes } from "@reface/html";
import { processAttributes } from "./attributes.ts";
import { createLogger } from "@reface/core";

const logger = createLogger("TemplateComponent");

export class TemplateComponent {
  private tag: string;
  private attributes: IHTMLAttributes;
  private css?: string;
  private rootClass?: string;

  constructor(
    tag: string,
    attributes: IHTMLAttributes = {},
    css?: string,
    rootClass?: string,
  ) {
    this.tag = tag;
    this.attributes = attributes;
    this.css = css;
    this.rootClass = rootClass;
  }

  render(children: ElementChildType[] = []): Template {
    logger.debug("Rendering template", {
      tag: this.tag,
      attributes: this.attributes,
      children: children,
    });
    return new Template({
      tag: this.tag,
      attributes: this.attributes,
      children,
      css: this.css,
      rootClass: this.rootClass,
    });
  }

  template(
    strings: TemplateStringsArray,
    ...values: ElementChildType[]
  ): Template {
    const result: ElementChildType[] = [];

    for (let i = 0; i < strings.length; i++) {
      if (strings[i]) {
        result.push(new TemplateText(strings[i]));
      }

      if (i < values.length) {
        const value = values[i];
        logger.debug("Processing value", { value });
        if (value != null) {
          if (Array.isArray(value)) {
            result.push(...value.map((v) => this.ensureTextNode(v)));
          } else {
            result.push(this.ensureTextNode(value));
          }
        }
      }
    }

    return this.render(result);
  }

  private ensureTextNode(value: any): ElementChildType {
    if (
      value instanceof Template ||
      value instanceof TemplateFragment ||
      value instanceof TemplateHtml
    ) {
      return value;
    }
    return new TemplateText(String(value));
  }

  static createTemplateFunction(tag: string) {
    return (props?: IHTMLAttributes) => {
      const attributes = props ? processAttributes(props) : {};
      const component = new TemplateComponent(tag, attributes);

      return component.template.bind(component);
    };
  }
}
