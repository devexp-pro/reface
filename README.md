<div align="center">
  <img src="./website/public/assets/logo.png" alt="Reface Logo" width="200" />
</div>

# Reface

[![JSR](https://jsr.io/badges/@vseplet/reface)](https://jsr.io/@vseplet/reface)
[![JSR Score](https://jsr.io/badges/@vseplet/reface/score)](https://jsr.io/@vseplet/reface)
[![Discord](https://img.shields.io/badge/join-chat-blue?logo=discord&logoColor=white)](https://discord.gg/gT4gvVwqb8)

> ⚠️ **Active Development**: Reface is currently in active development and not recommended for production use. We're using it in our projects and would appreciate your feedback and contributions.

Zero-build meta-framework for modern web applications with HTMX integration and Islands Architecture.

## Core Features

- Type-safe templates with JSX and template literals
- CSS-in-JS with styled components
- HTMX integration for interactivity
- Plugin system for extensibility
- Server-side rendering
- No build step required

## Ecosystem

| Package   | Status   | Description & API                                                                   |
| --------- | -------- | ----------------------------------------------------------------------------------- |
| ReCast    | Beta     | Core templating engine<br>`component`, `element`, `html`, `styled`                  |
| Reface    | Beta     | Meta-framework for modern web applications<br>`hono`, `partila`, `island`           |
| Reface UI | Planning | UI component library for web applications<br>`Panel`, `Grid`, `Button`, `Icon`, etc |
| ReStory   | Planning | Component development tools<br>`cli`, `*.story.tsx`                                 |
| ReDocs    | Planning | Documentation system                                                                |

## Quick Start

```typescript
import { Hono } from "hono";
import { Reface, styled, html } from "reface";

// Styled components
const Button = styled.button/*css*/ `
  & {
    background: var(--color-primary);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }
  &:hover {
    background: var(--color-primary-dark);
  }
`;

const JokeText = styled.p/*css*/ `
  & {
    font-size: var(--text-xl);
    margin: 2rem 0;
    font-style: italic;
    min-height: 4rem;
  }
`;

// Interactive component with HTMX
const JokePartial = Reface.partial(async () => {
  const joke = await (
    await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "text/plain" },
    })
  ).text();

  return <JokeText>${joke}</JokeText>;
}, "joke");

// Page component
const HomePage = component(() => (
  <div>
    <h1>Dad Jokes</h1>
    <div>
      <JokePartial>
        <JokeText>Click the button to load a joke!</JokeText>
      </JokePartial>
      <Button {...JokePartial.trigger("click")}>Get New Joke</Button>
    </div>
  </div>
));

// Setup application
const app = new Hono();
const reface = new Reface();
reface.hono(app);

app.get("/", (c) => c.html(reface.render(<HomePage />)));
await Deno.serve(app.fetch);
```

## Documentation

- [We can found here](./docs/)

## Contributing

Issues and PRs are welcome! Join our [Discord](https://discord.gg/gT4gvVwqb8) for discussions.

## License

MIT © [Reface](./LICENSE)
