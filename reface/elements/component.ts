import type { Template, TemplateFragment } from "@reface/html";
import type {
  ComponentFunction,
  ElementChild,
  HTMLAttributes,
  TemplateLiteralFunction,
} from "./types.ts";
import { html } from "@reface/html";

/**
 * Process template literal children
 */
export function processElementChildren(
  strings: TemplateStringsArray | undefined,
  values: ElementChild[]
): ElementChild[] {
  if (!strings) return values;
  const fragment = html(strings, ...values);
  return [fragment as unknown as ElementChild];
}

/**
 * Create component function
 */
export function component<T extends object>(
  render: (props: T, children: ElementChild[]) => Template
): ComponentFunction<T & HTMLAttributes> {
  function componentFunction(
    propsOrStrings?: T & HTMLAttributes,
    ...values: ElementChild[]
  ): TemplateLiteralFunction;
  function componentFunction(
    strings: TemplateStringsArray,
    ...values: ElementChild[]
  ): Template;
  function componentFunction(
    propsOrStrings?: (T & HTMLAttributes) | TemplateStringsArray,
    ...values: ElementChild[]
  ): TemplateLiteralFunction | Template {
    // Template literal call
    if (Array.isArray(propsOrStrings) && "raw" in propsOrStrings) {
      const strings = propsOrStrings as TemplateStringsArray;
      return render({} as T, processElementChildren(strings, values));
    }

    // Props call
    const props =
      (propsOrStrings as T & HTMLAttributes) || ({} as T & HTMLAttributes);
    const { children: propsChildren, ...restProps } = props as {
      children?: ElementChild | ElementChild[];
    } & T;

    // Template literal function
    if (values.length === 0) {
      const templateLiteralFn = (
        strings: TemplateStringsArray,
        ...templateValues: ElementChild[]
      ) => {
        return render(
          restProps as T,
          processElementChildren(strings, templateValues)
        );
      };

      return Object.assign(templateLiteralFn, {
        isTemplate: true as const,
        tag: componentFunction.tag,
      });
    }

    // JSX call with values as children
    if (values.length > 0) {
      return render(restProps as T, values);
    }

    // Props call with children in props
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

  return componentFunction as ComponentFunction<T & HTMLAttributes>;
}
