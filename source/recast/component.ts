import {
  type ComponentFn,
  createTemplateFactory,
  isTemplate,
  type Template,
  type TemplateAttributes,
  type TemplatePayload,
} from "@reface/recast";
import { $, Traverser } from "./query/mod.ts";

export type ComponentProps = TemplateAttributes;

const generateId = () => {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
};

export const component = <
  P extends Record<string, any>,
  T extends TemplatePayload = TemplatePayload,
>(
  render: ComponentFn<P>,
): Template<P, T> => {
  const id = generateId();
  const traverser = new Traverser();

  function rendered(attrs: P, children: ElementChildType[]) {
    const result = render(attrs, children);

    if (isTemplate(result)) {
      // Добавляем id компонента в корневой элемент
      if (!result.raw.attributes.__rcc) {
        result.raw.attributes.__rcc = [id];
      } else if (!result.raw.attributes.__rcc.includes(id)) {
        result.raw.attributes.__rcc.push(id);
      }

      // Находим все вложенные Template и добавляем им атрибут __rcc
      traverser.transform(
        result,
        $().type("template"),
        (template) => {
          if (!template.raw.attributes.__rcc) {
            template.raw.attributes.__rcc = [id];
          } else if (!template.raw.attributes.__rcc.includes(id)) {
            template.raw.attributes.__rcc.push(id);
          }
          return template;
        },
      );
    }

    return result;
  }

  const componentTemplate = createTemplateFactory({
    type: "component",
    create: {
      defaults: {
        attributes: {} as P,
        payload: {
          component: {
            id,
          },
        } as T,
      },
    },
  });

  return componentTemplate(rendered) as Template<P, T>;
};
