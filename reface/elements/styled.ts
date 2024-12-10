import { createLogger } from "@reface/core";
import type { ElementChildType } from "@reface/html";
import { TemplateComponent } from "@reface/html";
import { component } from "./component.ts";
import {
  buildClassName,
  buildCss,
  createStyledTemplate,
  type StyledTemplate,
} from "./styled-template.ts";

const logger = createLogger("Styled");

type StyledComponent = ReturnType<typeof component> & StyledTemplate;

function createStyledComponent(
  tag: string | StyledTemplate,
  cssTemplate: TemplateStringsArray,
  cssValues: unknown[],
): StyledComponent {
  const css = String.raw(cssTemplate, ...cssValues);
  logger.debug("Creating styled component", { tag, css });

  const template = createStyledTemplate(tag, css);

  const componentFn = component<{ class?: string }>(
    function StyledComponent(props = {}, children) {
      logger.debug("Rendering styled component", {
        tag: template.tag,
        props,
        rootClass: template.rootClass,
        childrenCount: children?.length,
      });

      const className = buildClassName(template, props.class);
      const combinedCss = buildCss(template);

      return new TemplateComponent(
        template.tag,
        { ...props, class: className },
        children,
        combinedCss,
        template.rootClass,
      );
    },
  ) as StyledComponent;

  // Копируем свойства шаблона в компонент
  Object.assign(componentFn, template);

  return componentFn;
}

// Прокси для создания styled компонентов
export const styled = new Proxy(
  (baseComponent: StyledComponent) => {
    return (strings: TemplateStringsArray, ...values: unknown[]) =>
      createStyledComponent(baseComponent, strings, values);
  },
  {
    get(target, tag: string) {
      return (strings: TemplateStringsArray, ...values: unknown[]) =>
        createStyledComponent(tag, strings, values);
    },
  },
);
