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
  private result: ITemplate | null = null;
  private props: Record<string, unknown> | null = null;
  public payload: Record<string, any> = {};

  constructor(
    private render: (
      props: Record<string, unknown>,
      children: ElementChildType[],
    ) => ITemplate,
    public payload: Record<string, any> = {},
  ) {
    // Создаем функцию, которая будет нашим прокси
    this.fn = function (this: TemplateFn, ...args: unknown[]) {
      const [props, children] = args as [
        Record<string, unknown>,
        ElementChildType[]?,
      ];
      if (children) {
        this.result = this.render(props, children);
        return this.result;
      }
      this.props = props;
      return this;
    }.bind(this);

    // Добавляем поддержку template literals
    return new Proxy(this, {
      apply: (target, thisArg, args) => {
        return this.fn.apply(thisArg, args);
      },
      get: (target, prop) => {
        if (prop === Symbol.toPrimitive || prop === "toString") {
          return () => "";
        }
        return (target as any)[prop];
      },
    }) as unknown as ITemplateFn & TemplateFn;
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
