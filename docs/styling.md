# Styling

RefaceComposer provides CSS-in-JS styling through the Styled Plugin.

## Basic Usage

### Simple Styled Component

```typescript
import { styled } from "@reface/plugins/styled";

const Button = styled.button`
  & {
    background: blue;
    color: white;
    padding: 8px 16px;
  }

  &:hover {
    background: darkblue;
  }
`;

// Usage
<Button>Click me</Button>;
```

### Component Extension

```typescript
const BaseButton = styled.button`
  & {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
  }
`;

const PrimaryButton = styled(BaseButton)`
  & {
    background: blue;
    color: white;
  }
`;

const SecondaryButton = styled(BaseButton)`
  & {
    background: gray;
    color: white;
  }
`;
```

## CSS Features

### Nested Selectors

```typescript
const Card = styled.div`
  & {
    padding: 16px;
    border: 1px solid #eee;
  }

  & h2 {
    margin: 0;
    color: #333;
  }

  & p {
    color: #666;
  }

  & .footer {
    margin-top: 16px;
    border-top: 1px solid #eee;
  }
`;
```

### Pseudo Classes

```typescript
const Input = styled.input`
  & {
    border: 1px solid #ccc;
    padding: 8px;
  }

  &:focus {
    border-color: blue;
    outline: none;
  }

  &::placeholder {
    color: #999;
  }

  &:disabled {
    background: #f5f5f5;
  }
`;
```

### Media Queries

```typescript
const Container = styled.div`
  & {
    width: 100%;
    padding: 16px;
  }

  @media (min-width: 768px) {
    & {
      width: 750px;
      margin: 0 auto;
    }
  }

  @media (min-width: 1200px) {
    & {
      width: 1170px;
    }
  }
`;
```

## Implementation Details

### Class Generation

```typescript
// Unique class names are automatically generated
const Button = styled.button`...`;
// Renders as: <button class="s1a">...</button>

const Card = styled.div`...`;
// Renders as: <div class="s1b">...</div>
```

### Style Collection

```typescript
// Styles are automatically collected and added to <style> tag
const composer = new RefaceComposer();
composer.use(new StyledPlugin());

const html = composer.render(
  <div>
    <Button>Click me</Button>
    <Card>Content</Card>
  </div>
);

// Renders as:
// <div>
//   <button class="s1a">Click me</button>
//   <div class="s1b">Content</div>
// </div>
// <style>
//   .s1a { ... }
//   .s1b { ... }
// </style>
```

### CSS Parser

- Replaces `&` with generated class name
- Handles nested selectors
- Processes media queries
- Maintains selector specificity

## Best Practices

1. **Component Design**

   - Keep styles component-scoped
   - Use semantic class names
   - Follow BEM-like nesting
   - Avoid deep nesting

2. **Performance**

   - Reuse base components
   - Minimize style rules
   - Use efficient selectors
   - Share common styles

3. **Maintainability**

   - Clear style structure
   - Consistent patterns
   - Documentation
   - Type safety

4. **Browser Support**
   - Cross-browser testing
   - Fallback styles
   - Progressive enhancement
   - Vendor prefixes
