import { Hono } from "@hono/hono";
import { serveStatic } from "@hono/hono/deno";
import { component, Reface } from "@reface";
import { LiveReloadPlugin } from "@reface/plugins/liveReload";
import { LayoutSimple } from "@reface/components/LayoutSimple";
import { loadDocs } from "./utils/docs.tsx";
import { resolveFromFile } from "./utils/resolveFromFile.ts";

import DocsPage from "./pages/DocsPage.tsx";
import HomePage from "./pages/HomePage.tsx";

const IS_DEV = Deno.env.get("DEV") === "true";

const { sections, pages } = await loadDocs();

if (!pages.size) {
  console.error("No documentation found!");
  console.log("Make sure you have documentation files in ./docs directory");
}

const Layout = component((_, children) => (
  <LayoutSimple
    title="Reface - Modern Template Engine"
    description="Type-safe template engine for HTML with JSX support"
    favicon="/assets/logo.png"
    normalizeCss
    htmx
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

if (IS_DEV) {
  reface.composer.use(new LiveReloadPlugin({ watchPaths: ["./"] }));
}

const app = new Hono();
reface.hono(app);

app.use(
  "/assets/*",
  serveStatic({ root: resolveFromFile("./public", import.meta.url) }),
);
app.use(
  "/styles/*",
  serveStatic({ root: resolveFromFile("./public", import.meta.url) }),
);

app.get("/", (c) => {
  return c.html(reface.render(<HomePage />));
});

app.get("/docs", (c) => {
  return c.html(reface.render(
    <DocsPage
      sections={sections}
      pages={pages}
    />,
  ));
});

app.get("/docs/:page", (c) => {
  return c.html(reface.render(
    <DocsPage
      sections={sections}
      pages={pages}
      currentPath={c.req.param("page")}
    />,
  ));
});

await Deno.serve(app.fetch);
