import { div, button, span } from "../elements.ts";
import type { ElementChild } from "../types/base.ts";
import type { JSXProps } from "./types.ts";
import type { Attributes } from "../types/mod.ts";
import type { Template } from "../../types.ts";

const elements = {
  div,
  button,
  span,
};

function processChildren(children: ElementChild[]): ElementChild[] {
  return children
    .map((child) => {
      if (Array.isArray(child)) {
        return processChildren(child);
      }
      if (child === null || child === undefined) {
        return "";
      }
      return child;
    })
    .flat();
}

export function createElement(
  tag: keyof typeof elements | Function,
  props: JSXProps | null,
  ...children: ElementChild[]
) {
  const processedChildren = processChildren(children);

  // Обработка styled компонентов
  if (typeof tag === "function") {
    const template = Object.assign([""], {
      raw: [""],
    }) as TemplateStringsArray;
    const component = tag(props || {})(template);
    return {
      ...component,
      children: processedChildren,
    };
  }

  // Обработка обычных HTML элементов
  const elementFn = elements[tag];
  const attributes = props || ({} as Attributes);

  // Удаляем children из props
  delete (attributes as JSXProps).children;

  const template = Object.assign([""], {
    raw: [""],
  }) as TemplateStringsArray;

  const element = elementFn(attributes)(template);
  return {
    ...element,
    children: processedChildren,
  };
}
