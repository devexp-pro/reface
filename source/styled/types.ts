import type { Template } from "../types.ts";
import type { ElementChild } from "../types/base.ts";

export type StyledComponent<T> = {
  (props?: T): Template & {
    (strings: TemplateStringsArray, ...values: ElementChild[]): Template;
  };
};
