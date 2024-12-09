import { Template } from "./Template.ts";
import type { ElementChildType } from "./types.ts";

export function createTemplateFunction(tag: string) {
  return (
    attributes: Record<string, unknown> = {},
    css?: string,
    rootClass?: string,
  ) => {
    return (
      strings: TemplateStringsArray,
      ...values: ElementChildType[]
    ): Template => {
      const children = strings.map((str, i) => {
        if (i < values.length) {
          return [str, values[i]];
        }
        return [str];
      }).flat();

      return new Template({
        tag,
        attributes,
        children,
        css,
        rootClass,
      });
    };
  };
}
