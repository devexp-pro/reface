import { Hono } from "@hono/hono";
import { component, Reface } from "@reface";
import { LayoutSimple } from "@reface-ui";

import { DemoPartial } from "./DemoPartial.tsx";

const Layout = component((_, children) => (
  <LayoutSimple
    title="Reface - Modern Template Engine"
    description="Type-safe template engine for HTML with JSX support"
    favicon="/assets/logo.png"
    htmx={true}
  >
    {children}
  </LayoutSimple>
));

const reface = new Reface({
  layout: Layout,
});

const app = new Hono();
reface.hono(app);

app.get("/", (c) => {
  return c.html(reface.render(<DemoPartial />));
});

export default app;
