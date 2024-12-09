import { createLogger } from "@reface/core";
import type { ElementChildType } from "@reface/html";
import { TemplateComponent } from "@reface/html";
import { component } from "./component.ts";

const logger = createLogger("Styled");

type StyledComponent = ReturnType<typeof component> & {
  rootClass: string;
  css: string;
  baseComponent?: StyledComponent;
};

function createStyledComponent(
  tag: string | StyledComponent,
  css: string,
): StyledComponent {
  const baseComponent = typeof tag !== "string" ? tag : undefined;
  const rootClass = `styled-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const tagName = typeof tag === "string" ? tag : tag.rootClass;

  logger.debug("Creating styled component", { tag: tagName, css });

  const StyledComponent = component<{ class?: string }>(
    function StyledComponent(props = {}, children) {
      logger.debug("Rendering styled component", {
        tag: tagName,
        props,
        rootClass,
        childrenCount: children?.length,
      });

      const baseClass = baseComponent ? baseComponent.rootClass : "";
      const className = props.class
        ? `${rootClass} ${baseClass} ${props.class}`
        : `${rootClass} ${baseClass}`.trim();

      const baseCss = baseComponent
        ? baseComponent.css.replace(/&/g, `.${baseClass}`)
        : "";
      const newCss = css.replace(/&/g, `.${rootClass}`);
      const combinedCss = `${baseCss}\n${newCss}`;

      const newTemplateComponent = new TemplateComponent(
        typeof tag === "string" ? tag : "button",
        {
          ...props,
          class: className,
        },
        combinedCss,
        rootClass,
      );

      return newTemplateComponent.template(children);
    },
  ) as StyledComponent;

  StyledComponent.rootClass = rootClass;
  StyledComponent.css = css;
  StyledComponent.baseComponent = baseComponent;

  return StyledComponent;
}

type StyledFunction = {
  (
    component: StyledComponent,
  ): (strings: TemplateStringsArray, ...values: any[]) => StyledComponent;
  [key: string]: (
    strings: TemplateStringsArray,
    ...values: any[]
  ) => StyledComponent;
};

function createStyledTag(tag: string) {
  return (strings: TemplateStringsArray, ...values: any[]) => {
    const css = strings.reduce((acc, str, i) => {
      return acc + str + (values[i] || "");
    }, "");
    return createStyledComponent(tag, css);
  };
}

function createStyledFromComponent(baseComponent: StyledComponent) {
  return (strings: TemplateStringsArray, ...values: any[]) => {
    const css = strings.reduce((acc, str, i) => {
      return acc + str + (values[i] || "");
    }, "");
    return createStyledComponent(baseComponent, css);
  };
}

const styledFunction =
  ((component: StyledComponent) =>
    createStyledFromComponent(component)) as StyledFunction;

const styledProxy = new Proxy(styledFunction, {
  get: (target, prop: string) => {
    if (prop in target) {
      return target[prop];
    }
    return createStyledTag(prop);
  },
});

export const styled = styledProxy;
