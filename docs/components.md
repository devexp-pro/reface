# Components in Reface

Reface provides two types of components: static components and interactive islands. Both types support JSX and template literals syntax.

## Static Components

Static components are pure functions that return HTML templates. They are rendered on the server and don't have any client-side interactivity.

### Basic Usage

```tsx
import { component } from "@vseplet/reface";

// Simple component
const Greeting = component<{ name: string }>(({ name }) => (
  <div class="greeting">Hello, {name}!</div>
));

// Usage
<Greeting name="World" />;
```

### Component Composition

```tsx
const Header = component<{ title: string }>(({ title }) => (
  <header class="header">
    <h1>{title}</h1>
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
    </nav>
  </header>
));

const Footer = component(() => (
  <footer class="footer">
    <p>&copy; 2024 My App</p>
  </footer>
));

const Layout = component<{ title: string; children: any }>(
  ({ title, children }) => (
    <div class="layout">
      <Header title={title} />
      <main>{children}</main>
      <Footer />
    </div>
  )
);
```

## Interactive Islands

Islands are components that can have server-side interactivity through RPC and REST handlers.

### Basic Island

```tsx
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

### Island with REST API

```tsx
const UserList = island<{}, { role: string }>({
  template: ({ props, rest }) => (
    <div class="users">
      <h2>Users ({props.role})</h2>
      <div {...rest.hx("self", "get", "/users")} hx-trigger="load, every 30s">
        Loading...
      </div>
      <button {...rest.hx("self", "post", "/users")} class="btn btn-primary">
        Add User
      </button>
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
    [POST("/users")]: async (req) => {
      const newUser = await createUser(req.formData);
      return RESPONSE(<li>{newUser.name}</li>);
    },
  },
});
```

### Island with RPC Calls

```tsx
const SearchBox = island<
  {
    search: { query: string };
    clear: null;
  },
  { placeholder: string }
>({
  template: ({ props, rpc }) => (
    <div class="search">
      <input
        type="search"
        placeholder={props.placeholder}
        {...rpc.hx.search()}
        hx-trigger="input changed delay:300ms"
        hx-target="#results"
      />
      <button {...rpc.hx.clear()} class="clear-btn">
        Clear
      </button>
      <div id="results"></div>
    </div>
  ),
  rpc: {
    search: async ({ args }) => {
      const results = await searchItems(args.query);
      return RESPONSE(
        <div class="results">
          {results.map((item) => (
            <div class="result-item">{item.title}</div>
          ))}
        </div>
      );
    },
    clear: async () => {
      return RESPONSE(<div></div>);
    },
  },
});
```

## Best Practices

1. **Component Organization**

   - Keep components small and focused
   - Use composition for complex UIs
   - Split islands by functionality

2. **Props and Types**

   - Always define prop types
   - Use discriminated unions for complex states
   - Keep props interface simple

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

```tsx
const ContactForm = island<
  {
    submit: { email: string; message: string };
  },
  void
>({
  template: ({ rpc }) => (
    <form {...rpc.hx.submit()} class="contact-form" hx-target="#form-status">
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          pattern="[^@]+@[^@]+\.[^@]+"
        />
      </div>
      <div class="form-group">
        <label>Message</label>
        <textarea name="message" required minlength="10"></textarea>
      </div>
      <button type="submit">Send</button>
      <div id="form-status"></div>
    </form>
  ),
  rpc: {
    submit: async ({ args }) => {
      try {
        await sendEmail(args.email, args.message);
        return RESPONSE(
          <div class="alert alert-success">Message sent successfully!</div>
        );
      } catch (error) {
        return RESPONSE(
          <div class="alert alert-danger">
            Failed to send message: {error.message}
          </div>
        );
      }
    },
  },
});
```

For more examples and use cases, check out our [examples directory](../../examples).
