# Styled Components

## Advanced Features

### Theme Support

```typescript
import { styled, createTheme } from "@vseplet/reface/styled";

// Define theme type
interface Theme {
  colors: {
    primary: string;
    secondary: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
}

// Create theme
const theme = createTheme<Theme>({
  colors: {
    primary: "#3182CE",
    secondary: "#4299E1",
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
  },
});

// Use theme in components
const Button = styled.button<{ size?: keyof Theme["spacing"] }>`
  & {
    background: ${theme.colors.primary};
    padding: ${(props) => theme.spacing[props.size || "medium"]};
    color: white;
  }

  &:hover {
    background: ${theme.colors.secondary};
  }
`;
```

### Component Composition

```typescript
// Base styles
const baseStyles = css`
  & {
    border: none;
    border-radius: 4px;
    font-weight: 500;
  }
`;

// Composing styles
const Button = styled.button`
  ${baseStyles}

  & {
    padding: 0.5rem 1rem;
  }
`;

// Extending components
const PrimaryButton = styled(Button)`
  & {
    background: blue;
    color: white;
  }
`;
```

### Dynamic Properties

```typescript
interface ButtonProps {
  size: "small" | "medium" | "large";
  variant: "solid" | "outline";
  disabled?: boolean;
}

const Button = styled.button<ButtonProps>`
  & {
    padding: ${(props) =>
      ({
        small: "0.5rem",
        medium: "1rem",
        large: "1.5rem",
      }[props.size])};

    ${(props) =>
      props.variant === "outline" &&
      css`
        background: transparent;
        border: 2px solid currentColor;
      `}

    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  }
`;
```

### Media Queries

```typescript
const ResponsiveBox = styled.div`
  & {
    width: 100%;
  }

  @media (min-width: 768px) {
    & {
      width: 50%;
    }
  }

  @container (min-width: 500px) {
    & {
      columns: 2;
    }
  }
`;
```

### Global Styles

```typescript
import { createGlobalStyle } from "@vseplet/reface/styled";

const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #3182CE;
    --font-family: system-ui, sans-serif;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-family);
    line-height: 1.5;
  }
`;
```

### CSS Variables

```typescript
const Button = styled.button`
  & {
    --button-bg: ${(props) => (props.primary ? "blue" : "gray")};
    --button-color: white;

    background: var(--button-bg);
    color: var(--button-color);
    border: none;
    border-radius: var(--border-radius, 4px);
  }
`;
```

## Type System

### Component Types

```typescript
// Styled component type
type StyledComponent<P = {}> = {
  (props: P): Template;
  className: string;
  displayName?: string;
};

// Style function type
type StyleFunction<P> = (props: P) => string | number;

// CSS helper type
type CSSProp<P> = string | number | StyleFunction<P>;
```

## Best Practices

1. **Organization**

   - Group related styled components
   - Use consistent naming patterns
   - Keep styles close to components

2. **Performance**

   - Use CSS variables for dynamic values
   - Minimize prop-based styles
   - Cache complex calculations

3. **Maintainability**

   - Use theme variables
   - Document complex styles
   - Follow component composition patterns

4. **Type Safety**
   - Define prop interfaces
   - Use theme types
   - Leverage TypeScript's type inference

For more information, see:

- [JSX Integration](../jsx/runtime.md)
- [CSS API](./css.md)
