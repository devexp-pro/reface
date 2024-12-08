# JSX Support

Reface provides first-class JSX support with full TypeScript integration.

## Basic Usage

```typescript
import { createElement, Fragment } from "@reface/jsx";
import type { Template } from "@reface/html";

// Simple component
function Greeting({ name }: { name: string }): Template {
  return <div>Hello, {name}!</div>;
}

// With children
function Card({ title, children }: { title: string; children: Template }) {
  return (
    <div class="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

// Usage
<Card title="Welcome">
  <Greeting name="World" />
</Card>;
```

## Components

### Function Components

```typescript
// Basic component
function Button({ text }: { text: string }): Template {
  return <button class="btn">{text}</button>;
}

// With children
function Layout({ children }: { children: Template }) {
  return (
    <div class="layout">
      <nav>Navigation</nav>
      <main>{children}</main>
      <footer>Footer</footer>
    </div>
  );
}
```

### Fragments

```typescript
// Multiple elements without wrapper
function List(): Template {
  return (
    <>
      <li>First item</li>
      <li>Second item</li>
    </>
  );
}

// Conditional groups
function Content({ isLoggedIn }: { isLoggedIn: boolean }): Template {
  return (
    <>
      {isLoggedIn && <UserProfile />}
      <MainContent />
    </>
  );
}
```

## Attributes

### HTML Attributes

```typescript
// Global attributes
<div id="main" class="container" title="Main content" hidden={true} />;

// Element-specific
<button type="submit" disabled={true} form="login-form">
  Submit
</button>;

// Data attributes
<div data-id="123" data-testid="container" data-user-role="admin" />;

// ARIA attributes
<button role="tab" aria-selected={true} aria-controls="panel-1">
  Tab 1
</button>;
```

### Dynamic Attributes

```typescript
// Conditional classes
<div class={isActive ? "active" : ""}>Content</div>;

// Spread attributes
const props = { class: "btn", disabled: true };
<button {...props}>Click me</button>;
```

## Children

### Dynamic Content

```typescript
// Conditional rendering
function Toggle({ on }: { on: boolean }) {
  return <div>{on ? <OnState /> : <OffState />}</div>;
}

// List rendering
function List({ items }: { items: string[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}

// Mixed content
function Content() {
  return (
    <div>
      Some text
      {42}
      <span>More text</span>
      {null}
      {undefined}
    </div>
  );
}
```

## Type Safety

### Component Types

```typescript
// Props interface
interface CardProps {
  title: string;
  subtitle?: string;
  children: Template;
}

// Typed component
function Card({ title, subtitle, children }: CardProps): Template {
  return (
    <div class="card">
      <h2>{title}</h2>
      {subtitle && <h3>{subtitle}</h3>}
      {children}
    </div>
  );
}
```

### Runtime Types

```typescript
// Template type
interface Template {
  tag: string;
  attributes: Record<string, unknown>;
  children: (string | Template)[];
  css?: string;
}

// JSX.Element maps to Template
declare namespace JSX {
  interface Element extends Template {}
}
```

## Best Practices

1. **Component Design**

   - Single responsibility
   - Clear props interface
   - Meaningful names

2. **Type Safety**

   - Use TypeScript strict mode
   - Define prop types
   - Validate children

3. **Performance**

   - Minimize props
   - Reuse components
   - Avoid deep nesting

4. **Patterns**
   - Composition over inheritance
   - Small, focused components
   - Clear component boundaries
     </rewritten_file>
