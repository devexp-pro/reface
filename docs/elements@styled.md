# Styled Components

Type-safe CSS-in-JS support for creating styled elements.

## Basic Usage

```typescript
import { styled } from "@reface/elements";

// Create styled button
const Button = styled.button`
  & {
    background: blue;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
  }

  &:hover {
    background: darkblue;
  }
`;

// Usage
Button()`Click me`; // => <button class="c0">Click me</button>
Button({ class: "primary" })`Submit`; // => <button class="c0 primary">Submit</button>
```

## Selectors

### Basic Selectors

```typescript
const Card = styled.div`
  & {
    padding: 1rem;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  // Child elements
  & .title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
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
    padding: 1rem;
  }

  // Nested elements
  & h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  & p {
    line-height: 1.5;
    margin-bottom: 1rem;
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

  @media (min-width: 1200px) {
    & {
      width: 1170px;
    }
  }
`;
```

## Component Extension

```typescript
const BaseButton = styled.button`
  & {
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
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

## Best Practices

1. **Style Organization**

   - Keep styles close to components
   - Use meaningful class names
   - Split complex styles

2. **Performance**

   - Reuse styled components
   - Use CSS variables for themes
   - Minimize style calculations

3. **Maintainability**

   - Follow consistent naming
   - Document complex styles
   - Use theme variables

4. **Type Safety**
   - Use TypeScript strict mode
   - Validate style values
   - Follow CSS standards
