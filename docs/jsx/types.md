# JSX Types

[← Home](../readme.md) | [← JSX Runtime](./runtime.md) | [Styled Components →](../styled/components.md)

Reface provides comprehensive TypeScript support for JSX, ensuring type safety across your application.

## Basic Types

### Element Types

```typescript
// Basic JSX element type
interface JSXElement {
  tag: string;
  attributes: string;
  children: unknown[];
  css: string;
  isTemplate: true;
  rootClass: string;
}

// JSX element factory
type ElementFactory<P = {}> = (props: P) => JSXElement;
```

### Attribute Types

```typescript
interface JSXAttributes {
  // Standard HTML attributes
  class?: string | ClassValue;
  id?: string;
  style?: string | StyleValue;

  // Event handlers
  onClick?: string;
  onChange?: string;
  onInput?: string;
  // ... other event handlers

  // ARIA attributes
  role?: string;
  [key: `aria-${string}`]: string | boolean | number;

  // Data attributes
  [key: `data-${string}`]: string;

  // HTMX attributes
  [key: `hx-${string}`]: string;
}
```

## Component Types

### Static Components

```typescript
// Component type
type Component<P = void> = (props: P) => JSXElement;

// Component with children
interface PropsWithChildren<P = {}> {
  children?: JSXElement | JSXElement[];
}

// Example usage
const Card = component<PropsWithChildren<{ title: string }>>(
  ({ title, children }) => (
    <div class="card">
      <h2>{title}</h2>
      {children}
    </div>
  )
);
```

### Interactive Islands

```typescript
// Island component type
interface Island<RPC, Props> {
  template: (args: {
    props: Props;
    rpc: RpcCalls<RPC>;
    rest: RestCalls;
  }) => JSXElement;
  rpc?: RpcHandlers<RPC>;
  rest?: RestHandlers;
}

// RPC types
type RpcCalls<R> = {
  hx: {
    [K in keyof R]: (args?: R[K]) => JSXAttributes;
  };
};

// Example usage
const Counter = island<{ increment: null }, { initial: number }>({
  template: ({ props, rpc }) => (
    <div>
      <span>{props.initial}</span>
      <button {...rpc.hx.increment()}>+1</button>
    </div>
  ),
});
```

## Styled Components

### Basic Styled Types

```typescript
// Styled component type
type StyledComponent<P = {}> = {
  (props: P): JSXElement;
  className: string;
  displayName?: string;
};

// Style function type
type StyleFunction<P> = (props: P) => string | number;

// Example usage
const Button = styled.button<{ primary?: boolean }>`
  & {
    background: ${(props) => (props.primary ? "blue" : "gray")};
    color: white;
  }
`;
```

## Intrinsic Elements

### HTML Elements

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    // Block elements
    div: JSXAttributes;
    p: JSXAttributes;
    section: JSXAttributes;

    // Inline elements
    span: JSXAttributes;
    a: JSXAttributes & { href?: string };
    button: JSXAttributes & { type?: "button" | "submit" | "reset" };

    // Form elements
    input: JSXAttributes & {
      type?: string;
      value?: string;
      required?: boolean;
    };
    form: JSXAttributes & {
      action?: string;
      method?: string;
    };

    // Media elements
    img: JSXAttributes & {
      src: string;
      alt: string;
      width?: string | number;
      height?: string | number;
    };
  }
}
```

## Type Utilities

### Helper Types

```typescript
// Class value types
type ClassValue = string | { [key: string]: boolean } | ClassValue[];

// Style value types
type StyleValue = string | { [key: string]: string | number };

// Children types
type ElementChild = string | number | boolean | null | undefined | JSXElement;
type ElementChildren = ElementChild[];
```

## Best Practices

1. **Type Safety**

   - Always define prop interfaces
   - Use strict TypeScript settings
   - Leverage type inference

2. **Component Types**

   - Keep prop types simple
   - Use discriminated unions for complex states
   - Document type constraints

3. **Performance**

   - Avoid unnecessary type casts
   - Use type utilities
   - Keep types DRY

4. **Maintenance**
   - Keep types up to date
   - Document complex types
   - Follow TypeScript best practices

For more information, see:

- [JSX Runtime](./runtime.md)
- [Components](../core/components.md)

## Related Sections

- [JSX Runtime](./runtime.md) - JSX syntax and usage
- [Component System](../core/components.md) - Component types
- [Elements API](../html/elements.md) - HTML element types
- [Styled Components](../styled/components.md) - Style types

## Navigation

- Previous: [← JSX Runtime](./runtime.md)
- Next: [Styled Components →](../styled/components.md)
