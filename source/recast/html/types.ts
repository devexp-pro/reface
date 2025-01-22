import type { Children, FragmentNode } from "@recast/expressions/mod.ts";

export type Html = {
  (trustedHtml: string): FragmentNode;
  (
    template: TemplateStringsArray,
    ...values: Children
  ): FragmentNode;
};
