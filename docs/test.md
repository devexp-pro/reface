# ReDocs Test Page

This page demonstrates all supported Markdown features.

## Text Formatting

Regular text with **bold**, _italic_, and **_bold italic_** text.

You can also use `inline code` for technical terms.

## Links

[External link](https://example.com)
[Internal link](./readme)

## Lists

Unordered list:

- First item
- Second item
  - Nested item
  - Another nested item
- Third item

Ordered list:

1. First step
2. Second step
   1. Sub-step one
   2. Sub-step two
3. Third step

## Code Blocks

Simple code:

```js
function hello() {
  console.log("Hello, ReDocs!");
}
```

TypeScript example:

```typescript
interface Props {
  name: string;
  age?: number;
}

const Component = component((props: Props) => <div>Hello, {props.name}!</div>);
```

## Tables

| Feature           | Status | Notes              |
| ----------------- | ------ | ------------------ |
| Markdown          | ✅     | Full support       |
| Code highlighting | ✅     | Multiple languages |
| Live reload       | ✅     | In development     |

## Blockquotes

> Important note about documentation
>
> Can span multiple lines
>
> > And can be nested

## Images

![ReDocs Logo](https://via.placeholder.com/150)

---

## Components

Example of using Reface UI components:

```tsx
const Button = styled.button/*css*/ `
  & {
    background: var(--colors-accent-base);
    color: white;
    padding: var(--spacing-md);
    border-radius: var(--radius-md);
  }

  &:hover {
    background: var(--colors-accent-hover);
  }
`;
```

## API Reference

### Functions

`parseMarkdown(content: string): ParsedMarkdown`
Parses markdown content into Reface components.

### Types

```typescript
interface DocPage {
  path: string;
  title: string;
  content: ParsedMarkdown;
}
```

### Configuration

```json
{
  "port": 3000,
  "watch": true,
  "root": "./docs"
}
```
