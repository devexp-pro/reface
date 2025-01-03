import type { ComponentNode, Node } from "./types.ts";

let componentCounter = 0;

export function generateComponentId(name?: string): string {
  componentCounter++;
  return `${name || "component"}_${componentCounter}`;
}

interface CreateComponentOptions<T> {
  name: string;
  render: (attrs: T, children?: Node[]) => Node;
  attributes: T;
  children?: Node[];
}

export function createComponent<T extends Record<string, any>>({
  name,
  render,
  attributes,
  children = [],
}: CreateComponentOptions<T>): ComponentNode<T> {
  return {
    type: "component",
    name,
    attributes,
    children,
    meta: {
      component: {
        id: generateComponentId(name),
        render,
      },
    },
  };
}

export function isComponent(node: any): node is ComponentNode {
  return node?.type === "component";
}

export function isComponentMeta(meta: any): meta is ComponentNode["meta"] {
  return typeof meta?.component === "object";
}
