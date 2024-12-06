# Component System

[← Home](../readme.md) | [← Core API](./readme.md) | [Server Integration →](./server.md)

Reface's component system provides two main types of components: static components and interactive islands. Both types support JSX and template literals syntax.

## Static Components

Static components are pure functions that return HTML templates. They are rendered on the server and don't have any client-side interactivity.

### Basic Usage

```typescript
import { component } from "@vseplet/reface";

// Simple component
const Greeting = component<{ name: string }>(({ name }) => (
  <div class="greeting">Hello, {name}!</div>
));

// Using template literals
const Button = component<{ text: string }>(
  ({ text }) => button({ class: "btn" })`${text}`
);
```

### Component Composition

```typescript
const Layout = component<{ title: string; children: Template }>(
  ({ title, children }) => (
    <div class="layout">
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
      <footer>&copy; 2024</footer>
    </div>
  )
);

// Usage
const Page = component(() => (
  <Layout title="Welcome">
    <Greeting name="World" />
    <Button text="Click me" />
  </Layout>
));
```

## Interactive Islands

Islands are components that can have server-side interactivity through RPC and REST handlers.

### RPC Handlers

```typescript
const Counter = island<{ increment: null }, { initial: number }>({
  template: ({ props, rpc }) => (
    <div class="counter">
      <span id="count">{props.initial}</span>
      <button {...rpc.hx.increment()}>+1</button>
    </div>
  ),
  rpc: {
    increment: async () => {
      const newCount = currentCount + 1;
      return RESPONSE(<span>{newCount}</span>);
    },
  },
});
```

### REST Handlers

```typescript
const UserList = island<{}, { role: string }>({
  template: ({ props, rest }) => (
    <div class="users">
      <h2>Users ({props.role})</h2>
      <div {...rest.hx("self", "get", "/users")}>Loading...</div>
    </div>
  ),
  rest: {
    [GET("/users")]: async (req) => {
      const users = await fetchUsers(req.query.role);
      return RESPONSE(
        <ul>
          {users.map((user) => (
            <li>{user.name}</li>
          ))}
        </ul>
      );
    },
  },
});
```

## Type System

### Component Types

```typescript
// Static component type
type Component<P = void> = (props: P) => Template;

// Island component type
interface Island<R, P> {
  template: (args: { props: P; rpc: RpcCalls<R>; rest: RestCalls }) => Template;
  rpc?: RpcHandlers<R>;
  rest?: RestHandlers;
}

// Template type
interface Template {
  tag: string;
  attributes: string;
  children: unknown[];
  css: string;
  isTemplate: true;
  rootClass: string;
}
```

### Handler Types

```typescript
// RPC handler type
type RpcHandler<T> = (args: { args: T; req: Request }) => Promise<Response>;

// REST handler type
type RestHandler = (req: Request) => Promise<Response>;
```

## Best Practices

1. **Component Organization**

   - Keep components small and focused
   - Use composition for complex UIs
   - Split islands by functionality

2. **Type Safety**

   - Always define prop types
   - Use discriminated unions for complex states
   - Keep interfaces simple and clear

3. **Performance**

   - Use static components when possible
   - Minimize the number of islands
   - Use appropriate trigger intervals

4. **Error Handling**
   - Handle loading states
   - Provide error feedback
   - Validate input data

## Examples

### Form with Validation

```typescript
const ContactForm = island<
  {
    submit: { email: string; message: string };
  },
  void
>({
  template: ({ rpc }) => (
    <form {...rpc.hx.submit()} class="contact-form">
      <div class="form-group">
        <label>Email</label>
        <input type="email" name="email" required />
      </div>
      <div class="form-group">
        <label>Message</label>
        <textarea name="message" required></textarea>
      </div>
      <button type="submit">Send</button>
    </form>
  ),
  rpc: {
    submit: async ({ args }) => {
      try {
        await sendEmail(args);
        return RESPONSE(<div class="success">Sent!</div>);
      } catch (error) {
        return RESPONSE(<div class="error">{error.message}</div>);
      }
    },
  },
});
```

## Related Sections

- [JSX Types](../jsx/types.md) - TypeScript support for components
- [HTML Templates](../html/templates.md) - Template creation
- [Styled Components](../styled/components.md) - Component styling

## Navigation

- Previous: [← Core API](./readme.md)
- Next: [Server Integration →](./server.md)
