# Using `styled` API in Reface

The `styled` API allows you to create components with isolated styles using modern CSS with nesting support. This makes component styling more convenient and declarative.

## Basic Usage

### Creating a Styled Component

You can create a styled component using the `styled` function. It takes an element factory and returns a new factory with added styles.

```typescript
import { styled, button, span } from "@vseplet/reface/dom";

const StyledButton = styled(button)`
  & {
    background: blue;
    color: white;
    padding: 1rem;
  }

  &:hover {
    background: darkblue;
  }

  & .icon {
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    & {
      padding: 0.5rem;
    }
  }
`;

// Using the component
const MyComponent = component(
  () =>
    StyledButton({ onClick: "alert('clicked')" })`
      Click me
      ${span({ class: "icon" })`👋`}
    `
);
```

### Nested Styles

Using `&` you can create nested styles that apply to child elements or pseudo-classes.

```typescript
const Card = styled(div)`
  & {
    background: white;
    border-radius: 8px;
    padding: 1rem;
  }

  & .title {
    font-size: 1.5rem;
    color: #333;
  }

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    & {
      padding: 0.5rem;
    }
  }
`;
```

### Using Media Queries

You can use media queries for responsive component styling.

```typescript
const ResponsiveBox = styled(div)`
  & {
    width: 100%;
    height: 200px;
    background: lightgray;
  }

  @media (max-width: 600px) {
    & {
      height: 100px;
    }
  }
`;
```

### Style Composition

You can combine styled components to create more complex components.

```typescript
const BaseButton = styled(button)`
  & {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const PrimaryButton = styled(BaseButton)`
  & {
    background: blue;
    color: white;
  }

  &:hover {
    background: darkblue;
  }
`;

const SecondaryButton = styled(BaseButton)`
  & {
    background: gray;
    color: white;
  }

  &:hover {
    background: darkgray;
  }
`;
```

### Dynamic Styles

You can use props to create dynamic styles.

```typescript
const DynamicButton = styled(button)`
  & {
    background: ${(props) => (props.primary ? "blue" : "gray")};
    color: white;
    padding: 1rem;
    border: none;
    border-radius: 4px;
  }
`;

// Usage
DynamicButton({ primary: true })`Click me`;
```

## Tips and Recommendations

1. **Style Isolation**

   - Use unique classes for components
   - Avoid global styles
   - Use nesting for style organization

2. **Performance**

   - Create styled components outside render functions
   - Use caching for frequently used styles

3. **Code Organization**
   - Group related styles together
   - Use composition for style reuse
   - Follow the DRY (Don't Repeat Yourself) principle

## Usage Examples

### Form with Styled Components

```typescript
const Form = styled(form)`
  & {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 400px;
    margin: 0 auto;
  }
`;

const Input = styled(input)`
  & {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  &:focus {
    outline: none;
    border-color: blue;
  }
`;

const SubmitButton = styled(button)`
  & {
    padding: 0.5rem;
    background: blue;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  &:hover {
    background: darkblue;
  }
`;

// Usage
const LoginForm = component(
  () =>
    Form()`
      ${Input({ type: "email", placeholder: "Email" })}
      ${Input({ type: "password", placeholder: "Password" })}
      ${SubmitButton({ type: "submit" })`Login`}
    `
);
```

## Conclusion

The styled API in Reface provides a powerful and flexible way to style components while maintaining isolation and ease of use. This allows you to create cleaner and more maintainable code.
