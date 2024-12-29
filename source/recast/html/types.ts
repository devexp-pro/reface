import type { Children, FragmentNode } from "@recast/expressions";

export type Html = {
  (trustedHtml: string): FragmentNode;
  (
    template: TemplateStringsArray,
    ...values: Children
  ): FragmentNode;
};
