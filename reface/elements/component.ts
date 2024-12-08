import type {
  ComponentFunction,
  HTMLAttributes,
  Template,
  ElementChild,
  TemplateLiteralFunction,
} from "@reface/html";
import { html } from "../html/html.ts";

/**
 * Process template literal children
 */
export function processElementChildren(
  strings: TemplateStringsArray | undefined,
  values: ElementChild[]
): ElementChild[] {
  if (!strings) return values;
  return [html(strings as TemplateStringsArray, ...values)];
}

export function component<T = object>(
  render: (props: T, children: ElementChild[]) => Template
): ComponentFunction<T & HTMLAttributes> {
  function componentFunction(
    propsOrStrings?: (T & HTMLAttributes) | TemplateStringsArray,
    ...values: ElementChild[]
  ): TemplateLiteralFunction | Template {
    // Template literal вызов
    if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
      return render({} as T, [html(propsOrStrings, ...values)]);
    }

    // JSX вызов или вызов с пропсами
    const props = propsOrStrings || ({} as T & HTMLAttributes);
    const { children: propsChildren, ...restProps } = props;

    // Если нет дополнительных значений, возвращаем TemplateLiteralFunction для template literals
    if (values.length === 0) {
      const templateLiteralFn = (
        strings: TemplateStringsArray,
        ...templateValues: ElementChild[]
      ) =>
        render(restProps as T, processElementChildren(strings, templateValues));

      return Object.assign(templateLiteralFn, {
        isTemplate: true as const,
        tag: componentFunction.tag,
      });
    }

    // JSX вызов - children приходят в values
    if (values.length > 0) {
      return render(restProps as T, values);
    }

    // Вызов с пропсами - children могут быть в props
    return render(
      restProps as T,
      Array.isArray(propsChildren)
        ? propsChildren
        : propsChildren
        ? [propsChildren]
        : []
    );
  }

  componentFunction.isTemplate = true as const;
  componentFunction.tag = "div";

  return componentFunction;
}
