# Components

Reface provides a powerful component system for building reusable UI elements.

## Basic Components

### Function Components

```typescript
// Simple component
function Button({ text }: { text: string }) {
  return <button>{text}</button>;
}

// Usage
<Button text="Click me" />;

// With children
function Container({ children }: { children: ElementChild[] }) {
  return <div class="container">{children}</div>;
}

// Usage
<Container>
  <h1>Title</h1>
  <p>Content</p>
</Container>;
```

### Component Properties

```typescript
// Typed props
interface CardProps {
  title: string;
  description?: string;
  image?: string;
  onClick?: () => void;
}

function Card({ title, description, image, onClick }: CardProps) {
  return (
    <div class="card" onClick={onClick}>
      {image && <img src={image} alt={title} />}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
```

## Component Composition

### Nested Components

```typescript
function Header() {
  return (
    <header>
      <Logo />
      <Navigation />
    </header>
  );
}

function Page() {
  return (
    <>
      <Header />
      <main>
        <Sidebar />
        <Content />
      </main>
      <Footer />
    </>
  );
}
```

### Component Patterns

```typescript
// Container Pattern
function DataContainer({ children }) {
  const data = useData();
  return children(data);
}

// Usage
<DataContainer>{(data) => <UserProfile user={data} />}</DataContainer>;

// Compound Components
const Tab = {
  Container: ({ children }) => <div class="tabs">{children}</div>,
  Item: ({ label }) => <div class="tab">{label}</div>,
  Content: ({ content }) => <div class="content">{content}</div>,
};

// Usage
<Tab.Container>
  <Tab.Item label="First" />
  <Tab.Content content="First content" />
</Tab.Container>;
```

## Type Safety

### Props Validation

```typescript
interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  onClick?: () => void;
}

function Button({ variant, size = "medium", disabled, onClick }: ButtonProps) {
  return (
    <button
      class={`btn btn-${variant} btn-${size}`}
      disabled={disabled}
      onClick={onClick}
    />
  );
}
```

### Children Types

```typescript
// Single child
interface SingleChildProps {
  children: ElementChild;
}

// Multiple children
interface MultipleChildrenProps {
  children: ElementChild[];
}

// Optional children
interface OptionalChildrenProps {
  children?: ElementChild | ElementChild[];
}
```

## Best Practices

1. **Component Design**

   - Keep components small and focused
   - Use TypeScript interfaces for props
   - Follow single responsibility principle
   - Implement proper error handling

2. **Performance**

   - Avoid unnecessary nesting
   - Use fragments when possible
   - Optimize renders
   - Cache expensive computations

3. **Maintainability**

   - Use meaningful component names
   - Document complex props
   - Follow consistent patterns
   - Write unit tests

4. **Accessibility**
   - Use semantic HTML
   - Include ARIA attributes
   - Support keyboard navigation
   - Test with screen readers
