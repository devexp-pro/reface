# Styling

Reface provides powerful CSS-in-JS styling through the Styled Plugin.

## Basic Usage

### Simple Styled Component

```typescript
import { styled } from "@reface/plugins/styled";

const Button = styled.button`
  & {
    background: blue;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
  }

  &:hover {
    background: darkblue;
  }
`;

// Usage
<Button>Click me</Button>;
```

### With Props

```typescript
interface ButtonProps {
  primary?: boolean;
  size?: "small" | "large";
}

const Button = styled.button<ButtonProps>`
  & {
    padding: ${(props) => (props.size === "small" ? "4px 8px" : "12px 24px")};
    background: ${(props) => (props.primary ? "blue" : "gray")};
    color: white;
    border: none;
    border-radius: 4px;
  }
`;

// Usage
<Button primary size="small">
  Small Primary
</Button>;
```

## Selectors

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

### Pseudo Selectors

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

## Media Queries

### Responsive Design

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

## Component Composition

### Extending Styles

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

## Global Styles

### Defining Global Styles

```typescript
import { createGlobalStyle } from "@reface/plugins/styled";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, system-ui, sans-serif;
    line-height: 1.5;
  }

  a {
    color: blue;
    text-decoration: none;
  }
`;

// Usage in root component
<>
  <GlobalStyle />
  <App />
</>;
```

## Best Practices

1. **Organization**

   - Component-specific styles
   - Reusable base components
   - Consistent naming
   - Theme variables

2. **Performance**

   - Style reuse
   - Minimal selectors
   - Efficient media queries
   - CSS optimization

3. **Maintainability**

   - Clear structure
   - Documentation
   - Type safety
   - Theme system

4. **Responsive Design**
   - Mobile-first approach
   - Breakpoint system
   - Flexible layouts
   - Consistent spacing

## Type Safety

### Theme Types

```typescript
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    text: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
}

const Button = styled.button<{ variant: "primary" | "secondary" }>`
  & {
    background: ${(props) => props.theme.colors[props.variant]};
    padding: ${(props) => props.theme.spacing.medium};
  }
`;
```
