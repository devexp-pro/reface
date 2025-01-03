# Primitive Content

## TextContent

Simple text or number values that will be escaped in HTML:

```typescript
type TextContent = string | number;

// Examples
("Hello world"); // -> "Hello world"
42; // -> "42"
```

## HtmlContent

Raw HTML content that will be inserted as-is:

```typescript
interface HtmlContent {
  type: "html";
  content: string;
  meta: Meta;
}

// Example
html("<div>Raw HTML</div>");
```

# Nodes

## Fragment

Container for multiple nodes without creating an element:

```typescript
interface FragmentNode extends BaseNode {
  type: "fragment";
  children: Node[];
  meta: Meta;
}

// Example
<>
  <div>First</div>
  <div>Second</div>
</>;
```

## Element

Basic HTML element node:

```typescript
interface ElementNode extends BaseNode {
  type: "element";
  tag: string;
  attributes: ElementAttributes;
  children: Node[];
  meta: Meta;
}
```

### Attributes Normalization

The system normalizes attributes for consistent processing:

1. Class attributes:

   ```typescript
   // Input variants
   { class: "foo bar" }
   { class: ["foo", "bar"] }
   { class: { foo: true, bar: false } }
   { className: "foo" }

   // Normalized output
   { class: ["foo", "bar"] }
   ```

2. Style attributes:

   ```typescript
   // Input variants
   { style: "color: red; margin-top: 10px" }
   { style: { color: "red", marginTop: "10px" } }
   { style: ["color: red", { marginTop: "10px" }] }

   // Normalized output
   { style: {
     "color": "red",
     "margin-top": "10px"
   }}
   ```

3. Other attributes:
   - CamelCase converted to kebab-case
   - CSS variables (--custom-prop) preserved
   - data-\* attributes preserved
   - Boolean attributes simplified
   - null/undefined values removed

## Component

Custom component node with its own render logic:

```typescript
interface ComponentNode<T extends Record<string, any>>
  extends BaseNode<{
    component: {
      id: string;
      render: (attrs: T, children?: Node[]) => Node;
    };
  }> {
  type: "component";
  attributes: T;
  children: Node[];
  meta: Meta;
}

// Example
const Button = component<ButtonProps>((props) => (
  <button class={["btn", `btn-${props.variant}`]}>{props.children}</button>
));
```
