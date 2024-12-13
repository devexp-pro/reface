import type {
  ElementChildType,
  IRenderManager,
  ITemplate,
  TemplateFn as ITemplateFn,
} from "../types.ts";
import { TemplateText } from "./mod.ts";

/**
 * Creates a template function that supports template literal syntax.
 * Handles conversion of template literals to template instances.
 *
 * @example
 * // Create template function
 * const fn = new TemplateFn(children =>
 *   new TemplateElement({
 *     tag: 'div',
 *     children
 *   })
 * );
 *
 * // Use as template literal
 * fn.fn`Hello ${name}`;
 *
 * // Use in other templates
 * div()`${fn.fn`nested`}`;
 */
export class TemplateFn implements ITemplate {
  private templateFn: ITemplateFn;
  private result: ITemplate | null = null;

  constructor(render: (children: ElementChildType[]) => ITemplate) {
    // @ts-ignore TODO: fix this
    this.templateFn = (
      strings: TemplateStringsArray,
      ...values: ElementChildType[]
    ) => {
      // Собираем массив детей из статического текста и значений
      const children: ElementChildType[] = [];

      for (let i = 0; i < strings.length; i++) {
        if (strings[i].trim()) {
          children.push(new TemplateText(strings[i]));
        }

        if (i < values.length) {
          const value = values[i];
          if (value != null) {
            if (Array.isArray(value)) {
              children.push(...value);
            } else {
              children.push(value);
            }
          }
        }
      }

      this.result = render(children);
      return this.result;
    };
  }

  get fn(): ITemplateFn {
    return this.templateFn;
  }

  toHtml(manager: IRenderManager): string {
    if (!this.result) {
      throw new Error("Template function must be called before rendering");
    }
    return this.result.toHtml(manager);
  }

  [Symbol.iterator]() {
    return {
      next: () => ({ done: true, value: undefined as never }),
    };
  }
}
