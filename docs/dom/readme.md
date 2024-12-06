<div style="display: flex; justify-content: center;">
  <img src="./logo.svg" alt="DOM API" style="width: 300px; height: auto;" />
</div>

# DOM API in Reface

Reface's DOM API provides a powerful and flexible way to create web interfaces using various development approaches. This module combines several APIs that can be used separately or combined for the best results.

## API Overview

### [HTML Template API](./html.md)

HTML Template API is the basic way to create templates using tagged template literals. It provides:

- Intuitive syntax for HTML creation
- Safe data interpolation
- Support for conditional rendering and loops

### [DOM Elements API](./dom.md)

DOM Elements API offers a functional approach to creating elements:

- Type-safe HTML element creation
- Convenient work with attributes and classes
- Built-in ARIA and accessibility support

### [Styled Components](./styled.md)

Styled Components API allows you to create components with isolated styles:

- Modern CSS with nesting support
- Dynamic styles based on props
- Style and component composition

### [JSX](./jsx.md)

JSX support for those who prefer React-like syntax:

- Familiar syntax for React developers
- Full integration with all other APIs
- Strict component typing

### [CSS API](./css.md)

CSS API for global styles and theming:

- Global style management
- Theme creation and usage
- Dynamic style application

## Choosing an Approach

1. **HTML Template API** is suitable if you:

   - Prefer working with pure HTML
   - Want maximum performance
   - Use simple templates

2. **DOM Elements API** is the best choice when:

   - Need a functional approach
   - Type safety is important
   - Fine control over attributes is required

3. **Styled Components** is perfect for:

   - Creating reusable components
   - Style isolation
   - Dynamic styling

4. **JSX** will be useful if you:
   - Have experience with React
   - Prefer declarative style
   - Work in a large team

## Combining Approaches

All APIs in the DOM module can be combined:

```typescript
// Using JSX with Styled Components
const StyledButton = styled(button)`
  & {
    background: blue;
    color: white;
  }
`;

// Component with JSX and HTML Template
const Card = component(() => (
  <div class="card">
    ${html`<h2>Title</h2>`}
    <StyledButton>Click me</StyledButton>
  </div>
));
```

## Best Practices

1. **API Selection**

   - Use the API that best suits your specific task
   - Don't be afraid to combine different approaches
   - Maintain a consistent style within a component

2. **Performance**

   - Create components outside render functions
   - Use memoization where necessary
   - Avoid excessive nesting

3. **Type Safety**

   - Always define prop types
   - Use strict typing
   - Check types at compile time

4. **Code Organization**
   - Group related components
   - Separate logic and presentation
   - Follow SOLID principles

## Conclusion

Reface's DOM API provides a flexible set of tools for creating modern web interfaces. With various development approaches, you can choose the style that best suits your project or team while maintaining all the benefits of type safety and performance.
