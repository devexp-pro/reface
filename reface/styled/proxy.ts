import type { Styled, StyledComponent, StyledTagFunction } from "./types.ts";
import { createStyledComponent } from "./component.ts";

const styledFunction =
  (<Tag extends string>(baseComponent: StyledComponent<Tag>) => {
    return ((strings: TemplateStringsArray, ...values: unknown[]) =>
      createStyledComponent<Tag>(
        baseComponent,
        strings,
        values,
      )) as unknown as StyledTagFunction<Tag>;
  }) as unknown as Styled;

export const styled = new Proxy(styledFunction, {
  get<Tag extends string>(_target: Styled, tag: PropertyKey) {
    return ((strings: TemplateStringsArray, ...values: unknown[]) =>
      createStyledComponent<Tag>(
        String(tag),
        strings,
        values,
      )) as unknown as StyledTagFunction<Tag>;
  },
});
