export type NodeType = "fragment" | "element" | "component";

export type Meta<T = Record<string, any>> = T;

export interface BaseNode<M = Record<string, any>> {
  type: NodeType;
  meta: Meta<M>;
  children?: Node[];
}

// Attributes types
export interface ElementAttributes {
  class?: string[];
  style?: Record<string, string>;
  [key: string]:
    | string
    | boolean
    | undefined
    | string[]
    | Record<string, string>;
}

// Inline content - not nodes
export type TextContent = string | number;

export interface HtmlContent {
  type: "html";
  content: string;
  meta: Meta;
}

// Container nodes - with children
export interface FragmentNode extends BaseNode {
  type: "fragment";
}

export interface ElementNode extends BaseNode {
  type: "element";
  tag: string;
  attributes: ElementAttributes;
}

export interface ComponentNode<
  T extends Record<string, any> = Record<string, any>,
> extends
  BaseNode<{
    component: {
      id: string;
      render: (attrs: T, children?: Node[]) => Node;
    };
  }> {
  type: "component";
  name?: string;
  attributes: T;
}

export type Node =
  | TextContent
  | HtmlContent
  | FragmentNode
  | ElementNode
  | ComponentNode<any>;
