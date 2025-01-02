import {
  processTemplateTagChildren,
  type Template,
  template,
} from "@reface/recast";

// Создаем тип для шаблона без атрибутов
type NoAttributes = Record<never, never>;
type HtmlTemplate = Template<NoAttributes, Record<string, any>>;

export const html = (
  strings: TemplateStringsArray,
  ...values: any[]
): HtmlTemplate => {
  return template({
    children: processTemplateTagChildren(strings, values),
  }) as HtmlTemplate;
};
