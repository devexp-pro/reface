import * as elements from "../elements/mod.ts";
import type { ElementChild } from "../types/base.ts";
import type { JSXProps, JSXElement } from "./types.ts";
import type { Template } from "../types.ts";

/**
 * Processes JSX children, flattening arrays and handling null/undefined values
 */
function processChildren(children: ElementChild[]): ElementChild[] {
  return children
    .map((child) => {
      // Handle arrays (e.g. from map())
      if (Array.isArray(child)) {
        return processChildren(child);
      }
      // Convert null/undefined to empty string
      if (child === null || child === undefined) {
        return "";
      }
      return child;
    })
    .flat();
}

/**
 * Validates and processes JSX props into HTML attribute string
 */
function processAttributes(props: JSXProps | null): string {
  if (!props) return "";

  // Clone props to avoid mutations
  const attrs: Record<string, unknown> = { ...props };

  // Remove special props
  delete attrs.children;
  delete attrs.innerHTML;

  // Handle className/class
  if ("class" in attrs) {
    attrs.className = attrs.class;
    delete attrs.class;
  }

  // Validate event handlers
  Object.entries(attrs)
    .filter(([key]) => key.startsWith("on"))
    .forEach(([key, value]) => {
      if (typeof value !== "string" && typeof value !== "function") {
        throw new Error(
          `Event handler for ${key} must be a string or function`
        );
      }
    });

  // Convert props to HTML attributes
  return Object.entries(attrs)
    .map(([key, value]) => {
      // Boolean attributes
      if (value === true) return key;
      if (value === false || value === null || value === undefined) return "";

      // Handle objects (e.g. style)
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }

      return `${key}="${value}"`;
    })
    .filter(Boolean)
    .join(" ");
}

/**
 * Creates a Template from a component function
 */
function createComponent(
  Component: Function,
  props: JSXProps | null,
  children: ElementChild[]
): Template {
  const componentProps = {
    ...props,
    children: children.length === 1 ? children[0] : children,
  };
  return Component(componentProps);
}

/**
 * Creates a Template from an HTML element
 */
function createElement(
  tag: keyof typeof elements | Function,
  props: JSXProps | null,
  ...children: ElementChild[]
): Template {
  try {
    // Process children first
    const processedChildren = processChildren(children);

    // Handle component functions
    if (typeof tag === "function") {
      return createComponent(tag, props, processedChildren);
    }

    // Get element factory
    const elementFn = elements[tag];
    if (!elementFn) {
      throw new Error(`Unknown element: ${String(tag)}`);
    }

    // Process attributes
    const attributes = processAttributes(props);
    const innerHTML = props?.innerHTML || "";

    // Create template
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
  } catch (error) {
    throw new Error(`Error creating element ${String(tag)}: ${error.message}`);
  }
}

export { createElement };
