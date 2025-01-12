# Partials

RefaceComposer's Partials Plugin provides interactive components with HTMX
integration.

## Basic Usage

### Simple Partial

```typescript
import { partial } from "@reface/plugins/partials";

const Counter = partial(async () => {
  const count = 0;
  return (
    <div>
      <span>{count}</span>
      <button {...Counter.trigger()}>Increment</button>
    </div>
  );
}, "counter");

// Usage
<Counter />;
```

### HTMX Integration

```typescript
// Default click trigger
const Button = partial(async () => {
  return <button {...Button.trigger()}>Click me</button>;
}, "button");

// Custom trigger with delay
const SearchBox = partial(async () => {
  return (
    <div>
      <input type="text" />
      <button {...SearchBox.trigger("keyup delay:500ms from:input")}>
        Search
      </button>
    </div>
  );
}, "search");

// Form submission
const Form = partial(async () => {
  return (
    <form {...Form.trigger("submit")}>
      <input type="text" name="title" />
      <button type="submit">Save</button>
    </form>
  );
}, "form");
```

## State Management

### Local State

```typescript
const TodoList = partial(async () => {
  const todos = await fetch("/api/todos").then((r) => r.json());

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li>
            {todo.title}
            <button {...TodoList.trigger()}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}, "todo-list");
```

### Shared State

```typescript
const CartCounter = partial(async () => {
  const count = await getCartCount();
  return <span>{count} items</span>;
}, "cart-counter");

const AddToCart = partial(async () => {
  return (
    <button {...AddToCart.trigger()} data-rerender="cart-counter">
      Add to Cart
    </button>
  );
}, "add-to-cart");
```

## Implementation Details

### Partial Registration

```typescript
// Partials are automatically registered during render
const composer = new RefaceComposer();
composer.use(new PartialsPlugin());

// Each partial gets a unique identifier
<div>
  <Counter /> <!-- data-partial="counter" -->
  <SearchBox /> <!-- data-partial="search" -->
</div>
```

### HTMX Attributes

```typescript
// Trigger generates HTMX attributes
const trigger = Counter.trigger("click");
// Results in:
// hx-get="/reface-partial/counter"
// hx-target="[data-partial='counter']"
// hx-trigger="click"

// Custom configuration
const trigger = SearchBox.trigger({
  event: "keyup",
  modifiers: {
    delay: 500,
    from: "input",
  },
});
```

### Server Integration

```typescript
// Partial handler is called on HTMX request
const handler = composer.getPlugin(PartialsPlugin)?.getHandler("counter");
const result = await handler();
// Result is used to update the partial
```

## Best Practices

1. **Component Design**

   - Keep partials focused
   - Clear state management
   - Proper error handling
   - Loading states

2. **Performance**

   - Minimal updates
   - Efficient triggers
   - Optimized responses
   - Cache when possible

3. **User Experience**

   - Loading indicators
   - Error feedback
   - Progressive enhancement
   - Fallback behavior

4. **Security**
   - Input validation
   - CSRF protection
   - Rate limiting
   - Error handling
