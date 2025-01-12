import { Hono } from "@hono/hono";
import { component, Reface } from "@reface";
import { LayoutSimple } from "@reface-ui";

import { TodoApp } from "./TodoApp.tsx";

const Layout = component((_, children) => (
  <LayoutSimple
    title="Reface - Modern Template Engine"
    description="Type-safe template engine for HTML with JSX support"
    favicon="/assets/logo.png"
    htmx={true}
    head={
      <>
        <link rel="stylesheet" href="/styles/fonts.css" />
        <link rel="icon" type="image/png" href="/assets/logo.png" />
      </>
    }
  >
    {children}
  </LayoutSimple>
));

const reface = new Reface({
  layout: Layout,
});

const app = new Hono();
reface.hono(app);

const Todo = reface.island(TodoApp);

app.get("/", (c) => {
  return c.html(reface.render(<Todo title="My Todos" />));
});

export default app;
