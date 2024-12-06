import * as elements from "../elements/mod.ts";
import type { ElementChild } from "../dom/types/base.ts";
import type { JSXProps } from "./types.ts";
import type { Attributes } from "../dom/types/mod.ts";
import type { Template } from "../types.ts";

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

function processAttributes(props: JSXProps | null): string {
  if (!props) return "";

  const attrs: Record<string, unknown> = { ...props };
  delete attrs.children;

  if ("class" in attrs) {
    attrs.className = attrs.class;
    delete attrs.class;
  }

  return Object.entries(attrs)
    .map(([key, value]) => {
      if (key === "innerHTML") return "";
      if (value === true) return key;
      if (value === false || value === null || value === undefined) return "";
      return `${key}="${value}"`;
    })
    .filter(Boolean)
    .join(" ");
}

export function createElement(
  tag: keyof typeof elements | Function,
  props: JSXProps | null,
  ...children: ElementChild[]
): Template {
  const processedChildren = processChildren(children);

  // Обработка компонентов
  if (typeof tag === "function") {
    return tag(props || {});
  }

  // Обработка HTML элементов
  const elementFn = elements[tag];
  if (!elementFn) {
    throw new Error(`Unknown element: ${String(tag)}`);
  }

  const attributes = processAttributes(props);
  const innerHTML = props?.innerHTML || "";

  return {
    tag: String(tag),
    attributes,
    children: innerHTML ? [innerHTML] : processedChildren,
    css: "",
    isTemplate: true,
    str: [""] as unknown as TemplateStringsArray,
    args: [],
    rootClass: "",
  };
}
