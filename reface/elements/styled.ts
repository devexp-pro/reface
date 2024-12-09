import { createLogger } from "@reface/core";
import type { ElementChildType } from "@reface/html";
import { TemplateComponent } from "@reface/html";
import { component } from "./component.ts";

const logger = createLogger("Styled");

function createStyledComponent(tag: string) {
  return function (strings: TemplateStringsArray, ...values: any[]) {
    const css = strings.reduce((acc, str, i) => {
      return acc + str + (values[i] || "");
    }, "");

    logger.debug("Creating styled component", { tag, css });

    const rootClass = `styled-${Math.random().toString(36).slice(2)}`;

    const StyledComponent = component<{ class?: string }>(
      function StyledComponent(props, children) {
        logger.debug("Rendering styled component", {
          tag,
          props,
          rootClass,
          childrenCount: children?.length,
        });

        const className = props.class
          ? `${rootClass} ${props.class}`
          : rootClass;

        const templateComponent = new TemplateComponent(
          tag,
          {
            ...props,
            class: className,
          },
          css,
          rootClass,
        );

        return templateComponent.template(children);
      },
    );

    // Добавляем rootClass как статическое свойство
    Object.defineProperty(StyledComponent, "rootClass", {
      value: rootClass,
      writable: false,
      configurable: false,
    });

    return StyledComponent;
  };
}

// Создаем и экспортируем styled как прокси
export const styled = new Proxy({}, {
  get: (_, tag: string) => createStyledComponent(tag),
}) as {
  [K: string]: ReturnType<typeof createStyledComponent>;
};
