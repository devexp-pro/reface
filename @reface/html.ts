import { RefaceTemplateHtml } from "@reface";

import { getChildren } from "./utils/getChildren.ts";

export const html = (strings: TemplateStringsArray, ...values: any[]) => {
  return new RefaceTemplateHtml({
    children: getChildren(strings, values),
  });
};
