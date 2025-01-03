## Node

```jsx
// Template to Node conversion
const template = div({ class: "box" })`Hello`;

// Creates node tree
const node: Node = {
  type: "element",
  tag: "div",
  attributes: {
    class: ["box"]
  },
  children: [{
    type: "text",
    content: "Hello"
  }],
  meta: {}
}

// Final HTML
"<div class="box">Hello</div>"
```

### Node Types

The template system is built on a unified Node type that can represent different kinds of content:

```ts
type Node = NodeText | NodeHtml | NodeElement | NodeComponent;

type Meta = Record<string, any>;

// Text content
type NodeText = string | number;

// HTML string content with possible children
interface NodeHtml {
  type: "html";
  content: string;
  children: Node[];
  meta: Meta;
}

// HTML and custom elements
interface NodeElement<T extends HTMLAttributes> {
  type: "element";
  tag: string;
  children: Node[];
  attributes: T;
  meta: Meta;
}

// Component instances
interface NodeComponent<T extends Record<string, any>> {
  type: "component";
  children: Node[];
  attributes: T;
  meta: Meta & {
    component: {
      id: string;
      render: (attrs: T, children?: Node[]) => Node;
    };
  };
}
```
