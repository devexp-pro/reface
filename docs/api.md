# API Reference

## Core API

### Template

Base template creation and manipulation:

```typescript
import { createTemplate } from "@reface/template";

const template = createTemplate({ tag: "div" });
template({ class: "container" })`Content`;
```

### Elements

Pre-defined HTML elements:

```typescript
import { button, div, span } from "@reface/elements";

div({ class: "container" })`
  ${span`Text`}
  ${button({ type: "button" })`Click me`}
`;
```

### JSX

JSX support:

```typescript
import { createElement, Fragment } from "@reface";

// Fragment
<>
  <div>First</div>
  <div>Second</div>
</>;

// Components
function Button(props: ButtonProps) {
  return <button class={props.class}>{props.children}</button>;
}
```

### Components

Component creation:

```typescript
import { component } from "@reface";

const Button = component<ButtonProps>((props, children) => {
  // Elements API
  return button({ class: props.class })`${children}`;

  // Or JSX
  return <button class={props.class}>{children}</button>;
});
```

## Framework API

### Reface

Main framework class:

```typescript
const app = new Reface({
  layout: Layout,
  plugins: [...plugins],
});

// Pages
app.page("/", HomePage);

// Hono integration
app.hono();
```

### Plugins

Built-in plugins:

```typescript
import { StyledPlugin } from "@reface/plugins/styled";
import { PartialsPlugin } from "@reface/plugins/partials";

app.use(new StyledPlugin());
app.use(new PartialsPlugin());
```

### Styling

CSS-in-JS system:

```typescript
import { styled } from "@reface/plugins/styled";

const Button = styled.button`
  & {
    /* styles */
  }
`;
```

### Islands

Interactive components:

```typescript
import { island } from "@reface";

const Interactive = island({
  template: () => {...},
  state: {...},
  rpc: {...}
});
```
