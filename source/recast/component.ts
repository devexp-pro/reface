import {
  type ComponentFn,
  createTemplateFactory,
  isTemplate,
  type Template,
  type TemplateAttributes,
  type TemplatePayload,
} from "@reface/recast";

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

  function rendered(attrs: P, children: ElementChildType[]) {
    const result = render(attrs, children);
    if (isTemplate(result)) {
      if (!result.raw.attributes.__rcc) {
        result.raw.attributes.__rcc = [id];
      }
      if (!result.raw.attributes.__rcc.includes(id)) {
        result.raw.attributes.__rcc.push(id);
      }
      result.raw.children.forEach((child) => {
        if (isTemplate(child) && child.raw.type === "slot") {
          // TODO:
        }
      });
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
