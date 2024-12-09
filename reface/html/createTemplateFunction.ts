import { Template } from "./Template.ts";
import type { ElementChildType } from "./types.ts";
import type { RenderContext } from "./render.ts";

export function createTemplateFunction(
  tag: string,
  attributes: Record<string, unknown> = {},
  css?: string,
  rootClass?: string,
) {
  return function (
    strings: TemplateStringsArray,
    ...values: ElementChildType[]
  ): Template {
    const children = strings.map((str, i) => {
      const value = i < values.length ? values[i] : "";
      return `${str}${value}`;
    });

    return new Template({
      tag,
      attributes,
      children,
      css,
      rootClass,
    });
  };
}
