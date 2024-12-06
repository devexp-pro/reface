# Styled Components in Reface

Styled Components in Reface allow you to create components with isolated styles using modern CSS with nesting support. This makes component styling more convenient and declarative.

## Creating Styled Components

### Basic Syntax

There are two ways to create styled components:

1. Using dot notation (recommended):

```typescript
import { styled } from "@vseplet/reface/dom";

const Button = styled.button`
  & {
    background: blue;
    color: white;
    padding: 1rem;
  }
`;

const Link = styled.a`
  & {
    color: blue;
    text-decoration: none;
  }
`;
```

2. Using styled function:

```typescript
import { styled, button } from "@vseplet/reface/dom";

const Button = styled(button)`
  & {
    background: blue;
    color: white;
    padding: 1rem;
  }
`;
```

### Styling Existing Components

You can create styled components based on other components:

```typescript
const BaseButton = styled.button`
  & {
    padding: 0.5rem 1rem;
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
```

## CSS Features

### Nested Styles

Use `&` for creating nested styles:

```typescript
const Card = styled.div`
  & {
    background: white;
    border-radius: 8px;
    padding: 1rem;
  }

  & .title {
    font-size: 1.5rem;
  }

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;
```

### Media Queries

```typescript
const ResponsiveBox = styled.div`
  & {
    width: 100%;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    & {
      padding: 1rem;
    }
  }
`;
```

### Dynamic Styles

```typescript
const DynamicButton = styled.button`
  & {
    background: ${(props) => (props.primary ? "blue" : "gray")};
    color: white;
    padding: ${(props) => (props.size === "large" ? "1rem" : "0.5rem")};
  }
`;

// Usage
DynamicButton({ primary: true, size: "large" })`Click me`;
```

## Usage Examples

### Form with Styled Components

```typescript
const Form = styled.form`
  & {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Input = styled.input`
  & {
    padding: 0.5rem;
    border: 1px solid #ccc;
  }

  &:focus {
    border-color: blue;
  }
`;

const SubmitButton = styled.button`
  & {
    background: blue;
    color: white;
  }
`;

// Usage
const LoginForm = component(() => (
  <Form>
    <Input type="email" placeholder="Email" />
    <Input type="password" placeholder="Password" />
    <SubmitButton type="submit">Login</SubmitButton>
  </Form>
));
```

## Best Practices

1. **Syntax Choice**

   - Use dot notation for HTML elements
   - Use `styled(Component)` for styling existing components

2. **Style Organization**

   - Group related styles
   - Use composition for reuse
   - Follow DRY principle

3. **Performance**

   - Create styled components outside render functions
   - Use caching for frequently used styles

4. **Style Isolation**
   - Use unique classes for components
   - Avoid global styles
   - Use nesting for style organization

## Conclusion

Styled Components in Reface provide a powerful and flexible way to style components while maintaining style isolation and ease of use. Support for both dot notation and functional approach allows you to choose the most suitable method for your specific needs.
