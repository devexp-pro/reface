# Styled Components

Styled Components provide a way to create reusable components with encapsulated styles using CSS-in-JS.

## Basic Usage

```typescript
import { styled } from "@reface/elements";

// Create a styled button
const Button = styled.button`
  & {
    background: blue;
    color: white;
    padding: 0.5rem 1rem;
  }
  &:hover {
    background: darkblue;
  }
`;

// Styles are processed by @html/styles
// and automatically scoped with unique class names

// Usage
Button()``; // => <button class="c0">...</button>
Button({ class: "primary" })`Click me`; // => <button class="c0 primary">Click me</button>
```

## Selectors

### Basic Selectors

```typescript
const Card = styled.div`
  & {
    padding: 1rem;
    border: 1px solid #eee;
  }

  // Child elements
  & .title {
    font-size: 1.5rem;
  }

  // Pseudo-classes
  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  // Pseudo-elements
  &::before {
    content: "";
    display: block;
  }
`;
```

### Nested Selectors

```typescript
const Container = styled.div`
  & {
    max-width: 1200px;
    margin: 0 auto;
  }

  // Nested elements
  & h1 {
    font-size: 2rem;
  }

  & p {
    line-height: 1.5;
  }

  // Deep nesting
  & .card {
    & .title {
      color: blue;
    }
    & .content {
      color: #666;
    }
  }
`;
```

## Dynamic Styles

### Props

```typescript
interface ButtonProps {
  primary?: boolean;
  size?: "small" | "large";
}

const Button = styled.button<ButtonProps>`
  & {
    background: ${(props) => (props.primary ? "blue" : "gray")};
    padding: ${(props) =>
      props.size === "large" ? "1rem 2rem" : "0.5rem 1rem"};
  }
`;

// Usage
Button({ primary: true, size: "large" })`Click me`;
```

### Theme Support

```typescript
const ThemeButton = styled.button`
  & {
    background: var(--primary-color, blue);
    color: var(--text-color, white);
  }
  &:hover {
    background: var(--primary-hover, darkblue);
  }
`;
```

## Component Extension

### Extending Styles

```typescript
const BaseButton = styled.button`
  & {
    border: none;
    padding: 0.5rem 1rem;
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

### Media Queries

```typescript
const Container = styled.div`
  & {
    width: 100%;
    padding: 1rem;
  }

  @media (min-width: 768px) {
    & {
      width: 750px;
      margin: 0 auto;
    }
  }
`;
```

## Type Safety

### Props Types

```typescript
// Type-safe props
interface CardProps {
  variant: "outlined" | "filled";
  elevation?: number;
}

const Card = styled.div<CardProps>`
  & {
    border: ${(props) =>
      props.variant === "outlined" ? "1px solid #eee" : "none"};
    box-shadow: ${(props) =>
      props.elevation
        ? `0 ${props.elevation}px ${props.elevation * 2}px rgba(0,0,0,0.1)`
        : "none"};
  }
`;

// Usage with type checking
Card({ variant: "outlined", elevation: 2 })`Content`;
```

## Best Practices

1. **Style Organization**

   - Keep styles close to components
   - Use meaningful component names
   - Split complex styles

2. **Performance**

   - Reuse styled components
   - Minimize dynamic styles
   - Use CSS variables for themes

3. **Maintainability**

   - Follow consistent naming
   - Document complex styles
   - Use theme variables

4. **Type Safety**
   - Define prop interfaces
   - Use strict TypeScript
   - Validate style values
     </rewritten_file>
