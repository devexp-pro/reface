# Theme System

Theme system in Reface provides a way to manage design tokens and create consistent styling across your application.

## Basic Usage

### Theme Definition

```typescript
import { createTheme } from "@vseplet/reface/styled";

// Define theme type
interface Theme {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  spacing: {
    small: string;
    medium: string;
    large: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      small: string;
      medium: string;
      large: string;
    };
  };
}

// Create theme instance
const theme = createTheme<Theme>({
  colors: {
    primary: "#3182CE",
    secondary: "#4299E1",
    text: "#2D3748",
    background: "#FFFFFF",
  },
  spacing: {
    small: "0.5rem",
    medium: "1rem",
    large: "2rem",
  },
  typography: {
    fontFamily: "system-ui, sans-serif",
    fontSize: {
      small: "0.875rem",
      medium: "1rem",
      large: "1.25rem",
    },
  },
});
```

### Using Theme

```typescript
const Button = styled.button<{ size?: keyof Theme["spacing"] }>`
  & {
    font-family: ${theme.typography.fontFamily};
    font-size: ${theme.typography.fontSize.medium};
    padding: ${(props) => theme.spacing[props.size || "medium"]};
    background: ${theme.colors.primary};
    color: white;
  }

  &:hover {
    background: ${theme.colors.secondary};
  }
`;
```

## CSS Variables

### Theme to CSS Variables

```typescript
const GlobalTheme = createGlobalStyle`
  :root {
    /* Colors */
    --color-primary: ${theme.colors.primary};
    --color-secondary: ${theme.colors.secondary};
    --color-text: ${theme.colors.text};
    --color-bg: ${theme.colors.background};

    /* Spacing */
    --spacing-small: ${theme.spacing.small};
    --spacing-medium: ${theme.spacing.medium};
    --spacing-large: ${theme.spacing.large};

    /* Typography */
    --font-family: ${theme.typography.fontFamily};
    --font-size-small: ${theme.typography.fontSize.small};
    --font-size-medium: ${theme.typography.fontSize.medium};
    --font-size-large: ${theme.typography.fontSize.large};
  }
`;
```

### Using CSS Variables

```typescript
const Card = styled.div`
  & {
    font-family: var(--font-family);
    color: var(--color-text);
    background: var(--color-bg);
    padding: var(--spacing-medium);
  }

  & .title {
    font-size: var(--font-size-large);
    color: var(--color-primary);
  }
`;
```

## Theme Variants

### Dark Theme

```typescript
const darkTheme: Theme = {
  colors: {
    primary: "#63B3ED",
    secondary: "#90CDF4",
    text: "#F7FAFC",
    background: "#1A202C",
  },
  // ... other theme values
};

const ThemeToggle = styled.div<{ isDark: boolean }>`
  & {
    --theme-bg: ${(props) =>
      props.isDark ? darkTheme.colors.background : theme.colors.background};
    --theme-text: ${(props) =>
      props.isDark ? darkTheme.colors.text : theme.colors.text};

    background: var(--theme-bg);
    color: var(--theme-text);
  }
`;
```

### Responsive Theme

```typescript
const responsiveTheme = css`
  :root {
    --spacing-base: 0.5rem;

    @media (min-width: 768px) {
      --spacing-base: 1rem;
    }

    --spacing-small: calc(var(--spacing-base) * 0.5);
    --spacing-medium: var(--spacing-base);
    --spacing-large: calc(var(--spacing-base) * 2);
  }
`;
```

## Theme Functions

### Helper Functions

```typescript
// Color manipulation
function adjustColor(color: string, amount: number): string {
  // Implementation for color adjustment
  return adjustedColor;
}

// Spacing calculation
function spacing(units: number): string {
  return `calc(var(--spacing-base) * ${units})`;
}

// Usage
const Button = styled.button`
  & {
    padding: ${spacing(2)};
    background: ${theme.colors.primary};

    &:hover {
      background: ${(props) => adjustColor(theme.colors.primary, 0.1)};
    }
  }
`;
```

## Best Practices

1. **Theme Structure**

   - Keep themes flat when possible
   - Use semantic names
   - Document theme values

2. **Performance**

   - Use CSS variables for dynamic values
   - Cache theme values
   - Minimize theme changes

3. **Maintainability**

   - Create theme types
   - Use consistent naming
   - Keep themes DRY

4. **Accessibility**
   - Test color contrast
   - Support dark mode
   - Consider user preferences

For more information, see:

- [CSS API](./css.md)
- [Styled Components](./components.md)
