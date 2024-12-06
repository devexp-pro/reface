# TWA Layout

TWA (Telegram Web App) layout provides a specialized setup for creating Telegram Mini Apps with proper integration and styling.

## Basic Usage

```typescript
import { Reface, twa } from "@vseplet/reface";

const app = new Reface({
  layout: twa({
    title: "My Telegram App",
    htmx: true,
  }),
});
```

## Configuration

### TWA Options

```typescript
interface TWALayoutOptions extends CleanLayoutOptions {
  // TWA specific options
  version?: string;
  backgroundColor?: string;
  headerColor?: string;
  botName?: string;

  // Viewport settings
  viewportFit?: "cover" | "contain";
  themeParams?: boolean;
}
```

### Full Example

```typescript
const app = new Reface({
  layout: twa({
    // TWA options
    version: "1.0.0",
    backgroundColor: "#ffffff",
    headerColor: "#3182CE",
    botName: "MyBot",
    viewportFit: "cover",
    themeParams: true,

    // Dependencies
    htmx: true,
    bootstrap: true,

    // Custom content
    head: `
      <meta name="tg-title" content="My TWA App">
      <meta name="tg-description" content="A Telegram Mini App">
    `,
    styles: [
      {
        href: "/twa-styles.css",
      },
    ],
  }),
});
```

## TWA Integration

### Theme Variables

```typescript
const Button = styled.button`
  & {
    background: var(--tg-theme-button-color);
    color: var(--tg-theme-button-text-color);
    border: none;
    padding: 0.5rem 1rem;
  }
`;

const Card = styled.div`
  & {
    background: var(--tg-theme-bg-color);
    color: var(--tg-theme-text-color);
    border: 1px solid var(--tg-theme-hint-color);
  }
`;
```

### TWA Events

```typescript
const MainButton = island<{ click: null }, { text: string }>({
  template: ({ props, rpc }) => (
    <button {...rpc.hx.click()} onClick="Telegram.WebApp.MainButton.show()">
      {props.text}
    </button>
  ),
  rpc: {
    click: async () => {
      // Handle click
      Telegram.WebApp.close();
      return RESPONSE(<div>Success!</div>);
    },
  },
});
```

## Best Practices

1. **Theme Integration**

   - Use TWA theme variables
   - Support both light/dark modes
   - Follow Telegram design guidelines

2. **Performance**

   - Minimize bundle size
   - Optimize for mobile
   - Use lazy loading

3. **User Experience**

   - Support back button
   - Handle offline state
   - Provide loading states

4. **Security**
   - Validate TWA data
   - Use HTTPS
   - Follow TWA guidelines

## Examples

### Basic TWA App

```typescript
const app = new Reface({
  layout: twa({
    title: "Simple TWA",
    htmx: true,
  }),
}).page("/", () => (
  <div class="container">
    <h1 style="color: var(--tg-theme-text-color)">Welcome to TWA</h1>
    <MainButton text="Close" />
  </div>
));
```

### Full TWA App

```typescript
const app = new Reface({
  layout: twa({
    title: "Full TWA",
    version: "1.0.0",
    backgroundColor: "#ffffff",
    headerColor: "#3182CE",
    themeParams: true,
    htmx: true,
    bootstrap: true,
    head: `
      <meta name="tg-title" content="Full TWA App">
      <meta name="tg-description" content="A full-featured TWA">
      <link rel="stylesheet" href="/twa-theme.css">
    `,
  }),
});

// Add pages
app
  .page("/", HomePage)
  .page("/settings", SettingsPage)
  .page("/profile", ProfilePage);

// Start server
Deno.serve(app.fetch);
```

### TWA Component

```typescript
const UserProfile = island<
  {
    save: { name: string; photo: string };
  },
  void
>({
  template: ({ rpc }) => (
    <form {...rpc.hx.save()} class="profile-form">
      <input
        type="text"
        name="name"
        style="background: var(--tg-theme-secondary-bg-color)"
      />
      <button type="submit" style="background: var(--tg-theme-button-color)">
        Save
      </button>
    </form>
  ),
  rpc: {
    save: async ({ args }) => {
      await saveProfile(args);
      Telegram.WebApp.close();
      return RESPONSE(<div>Saved!</div>);
    },
  },
});
```

For more information, see:

- [Clean Layout](./clean.md)
- [Custom Layouts](./custom.md)
