---
title: Integrations
description: Third-party integrations for Recast, including HTMX support
tags: [integrations, htmx, third-party]
category: Tools
sidebar: main
order: 9
---

# Integrations

Recast provides integrations with popular libraries and tools through specialized Template methods and helpers.

## HTMX Integration

Import from:

```typescript
import { hx } from "@reface/recast/htmx";
```

### Basic Usage

HTMX attributes can be added to any Template:

```typescript
import { div } from "@reface/recast";

div({
  "hx-post": "/api/submit",
  "hx-trigger": "click",
  "hx-target": "#result",
})`Submit`;

// Or using the hx helper
div(
  hx({
    post: "/api/submit",
    trigger: "click",
    target: "#result",
  })
)`Submit`;
```

### Component Integration

ComponentNodeProxies can use HTMX with automatic ID linking:

```typescript
const Form = component((props) => (
  <div>
    <form hx-post="/submit" hx-target={`#result-${props.__rcc}`}>
      <input name="data" />
      <button>Submit</button>
    </form>
    <div id={`result-${props.__rcc}`}>Result will appear here</div>
  </div>
));
```

### HTMX Helper Types

Full TypeScript support for HTMX attributes:

```typescript
interface HtmxConfig {
  get?: string;
  post?: string;
  put?: string;
  delete?: string;
  patch?: string;
  trigger?: string;
  target?: string;
  swap?:
    | "innerHTML"
    | "outerHTML"
    | "beforebegin"
    | "afterbegin"
    | "beforeend"
    | "afterend";
  select?: string;
  headers?: Record<string, string>;
  vals?: Record<string, string>;
  confirm?: string;
  indicator?: string;
}

// Usage with type checking
div(
  hx({
    post: "/api/submit", // ✓ valid
    trigger: "click", // ✓ valid
    swap: "innerHTML", // ✓ valid
    invalid: true, // ✗ Error: unknown property
  })
);
```

### Extended Functionality

Additional HTMX features through Template methods:

```typescript
// Boosting links
a(
  hx({
    boost: true,
    pushUrl: true,
  })
)`Home`;

// Loading indicators
div(
  hx({
    post: "/api/slow",
    indicator: "#spinner",
  })
)`
  Submit
  ${div({ id: "spinner", class: "htmx-indicator" })`Loading...`}
`;

// Request targeting
form(
  hx({
    post: "/api/submit",
    target: "#result",
    swap: "outerHTML",
  })
)`
  <input name="data" />
  <button>Submit</button>
`;
```

### Server-Side Integration

Handle HTMX requests on the server:

```typescript
// Check for HTMX request
app.post("/api/submit", (req) => {
  const isHtmx = req.headers["HX-Request"] === "true";

  if (isHtmx) {
    // Return partial HTML for HTMX
    return div({ id: "result" })`Success!`;
  }

  // Return full page for regular request
  return fullPage();
});
```
