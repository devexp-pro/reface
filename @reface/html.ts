import { processChildren, template } from "./template/mod.ts";

export const html = (strings: TemplateStringsArray, ...values: any[]) => {
  return template({
    children: processChildren(strings, values),
  });
};
