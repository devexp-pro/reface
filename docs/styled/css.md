# CSS API

[← Home](../readme.md) | [← Styled Components](./components.md) | [Theme System →](./theme.md)

CSS API in Reface provides tools for working with styles, from basic CSS to advanced dynamic styling.

## Basic Usage

### CSS Helper

```typescript
import { css } from "@vseplet/reface/styled";

// Basic CSS
const styles = css`
  color: blue;
  font-size: 16px;
`;

// With nesting
const cardStyles = css`
  & {
    padding: 1rem;
    background: white;
  }

  & .title {
    font-size: 1.5rem;
  }
`;
```

### Dynamic Styles

```typescript
// With props
const buttonStyles = css<{ primary?: boolean }>`
  & {
    background: ${(props) => (props.primary ? "blue" : "gray")};
    color: white;
    padding: 0.5rem 1rem;
  }
`;

// With variables
const cardStyles = css`
  & {
    --card-bg: white;
    --card-padding: 1rem;

    background: var(--card-bg);
    padding: var(--card-padding);
  }
`;
```

## Style Composition

### Combining Styles

```typescript
// Base styles
const baseButton = css`
  & {
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

// Extended styles
const primaryButton = css`
  ${baseButton}

  & {
    background: blue;
    color: white;
  }
`;
```

### Style Functions

```typescript
const getColorStyles = (color: string) => css`
  & {
    color: ${color};
    border-color: ${color};
  }
`;

const Button = styled.button`
  ${getColorStyles("blue")}

  & {
    padding: 0.5rem 1rem;
  }
`;
```

## Media Queries

### Basic Media Queries

```typescript
const ResponsiveBox = styled.div`
  & {
    width: 100%;
    padding: 1rem;
  }

  @media (min-width: 768px) {
    & {
      width: 50%;
      padding: 2rem;
    }
  }
`;
```

### Container Queries

```typescript
const Card = styled.div`
  & {
    container-type: inline-size;
  }

  @container (min-width: 300px) {
    & {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
`;
```

## CSS Variables

### Variable Definition

```typescript
const theme = {
  colors: {
    primary: "var(--color-primary, blue)",
    secondary: "var(--color-secondary, gray)",
  },
  spacing: {
    small: "var(--spacing-small, 0.5rem)",
    medium: "var(--spacing-medium, 1rem)",
  },
};

const Button = styled.button`
  & {
    --button-bg: ${theme.colors.primary};
    --button-padding: ${theme.spacing.medium};

    background: var(--button-bg);
    padding: var(--button-padding);
  }
`;
```

### Global Variables

```typescript
import { createGlobalStyle } from "@vseplet/reface/styled";

const GlobalStyles = createGlobalStyle`
  :root {
    --color-primary: #3182CE;
    --color-secondary: #4299E1;
    --spacing-unit: 0.25rem;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;
```

## Best Practices

1. **Style Organization**

   - Group related styles
   - Use meaningful names
   - Keep styles modular

2. **Performance**

   - Use CSS variables for dynamic values
   - Minimize style recalculations
   - Cache computed styles

3. **Maintainability**

   - Follow consistent naming
   - Document complex styles
   - Use theme variables

4. **Compatibility**
   - Test across browsers
   - Provide fallbacks
   - Follow CSS best practices

For more information, see:

- [Styled Components](./components.md)
- [Theme System](./theme.md)

## Related Sections

- [Styled Components](./components.md) - Component styling
- [Theme System](./theme.md) - Theme variables
- [Elements API](../html/elements.md) - HTML elements
- [JSX Runtime](../jsx/runtime.md) - JSX styling

## Navigation

- Previous: [← Styled Components](./components.md)
- Next: [Theme System →](./theme.md)
