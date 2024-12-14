# Islands

Islands architecture in Reface allows creating interactive components with minimal JavaScript.

## Basic Concepts

### What is an Island?

An island is an isolated interactive component that:

- Renders on the server
- Hydrates independently
- Updates without full page reload
- Uses minimal JavaScript

## Basic Usage

### Simple Island

```typescript
import { island } from "@reface/plugins/island";

const Counter = island(async () => {
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

### With Data Fetching

```typescript
const UserProfile = island(async () => {
  const user = await fetch("/api/user").then((r) => r.json());
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}, "user-profile");
```

## HTMX Integration

### Triggers

```typescript
const SearchBox = island(async () => {
  return (
    <div>
      <input type="text" />
      <button {...SearchBox.trigger("keyup delay:500ms from:input")}>
        Search
      </button>
    </div>
  );
}, "search");
```

### Custom Events

```typescript
const Form = island(async () => {
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
const TodoList = island(async () => {
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
const CartCounter = island(async () => {
  const count = await getCartCount();
  return <span>{count} items</span>;
}, "cart-counter");

const AddToCart = island(async () => {
  return (
    <button {...AddToCart.trigger()} data-rerender="cart-counter">
      Add to Cart
    </button>
  );
}, "add-to-cart");
```

## Advanced Patterns

### Lazy Loading

```typescript
const LazyComponent = island(async () => {
  const Component = await import("./heavy-component");
  return <Component />;
}, "lazy-component");
```

### Conditional Rendering

```typescript
const ConditionalIsland = island(async () => {
  const shouldRender = await checkCondition();

  if (!shouldRender) {
    return null;
  }

  return <div>Conditional Content</div>;
}, "conditional");
```

## Performance

### Best Practices

1. **Minimal JavaScript**

   - Load only necessary code
   - Use progressive enhancement
   - Avoid large dependencies

2. **Efficient Updates**

   - Target specific elements
   - Use proper triggers
   - Optimize server responses

3. **State Management**

   - Keep state minimal
   - Use server-side state
   - Share state carefully

4. **Loading States**
   - Show loading indicators
   - Handle errors gracefully
   - Provide fallbacks

## Type Safety

### Island Types

```typescript
interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const TypedTodoList = island<TodoItem[]>(async () => {
  const todos = await fetch("/api/todos").then((r) => r.json());
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title}
          <input
            type="checkbox"
            checked={todo.completed}
            {...TypedTodoList.trigger("change")}
          />
        </li>
      ))}
    </ul>
  );
}, "typed-todos");
```

## Error Handling

### Graceful Degradation

```typescript
const ErrorBoundaryIsland = island(async () => {
  try {
    const data = await riskyOperation();
    return <div>{data}</div>;
  } catch (error) {
    return (
      <div class="error">
        Something went wrong
        <button {...ErrorBoundaryIsland.trigger()}>Retry</button>
      </div>
    );
  }
}, "error-boundary");
```
