import { processChildren, type Template, template } from "@reface/template";

// Создаем тип для шаблона без атрибутов
type NoAttributes = Record<never, never>;
type HtmlTemplate = Template<NoAttributes, Record<string, any>>;

export const html = (
  strings: TemplateStringsArray,
  ...values: any[]
): HtmlTemplate => {
  return template({
    children: processChildren(strings, values),
  }) as HtmlTemplate;
};
