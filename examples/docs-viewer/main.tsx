import { createElement } from "../../source/mod.ts";
import { Reface, clean } from "../../source/mod.ts";
import { Hono } from "@hono/hono";
import { serveStatic } from "https://deno.land/x/hono@v3.11.7/middleware.ts";
import { loadDocs } from "./utils/docs.tsx";
import { DocsViewer } from "./components/DocsViewer.tsx";
import { LiveReload } from "./utils/live-reload.ts";

// App initialization
const sections = await loadDocs("./docs");

if (!sections.length) {
  console.error("No documentation sections found!");
}

// Инициализируем live reload
const isDev = Deno.env.get("DENO_ENV") !== "production";
const liveReload = isDev ? new LiveReload(["./docs", "./examples"]) : null;

const reface = new Reface({
  layout: clean({
    title: "Reface Documentation",
    description: "Modern Template Engine for Server-Side Applications",
    favicon: "/assets/favicon.svg",
    head: `
      <link rel="stylesheet" href="/styles/fonts.css">
      <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
      <link rel="icon" type="image/png" href="/assets/favicon.png">
      ${liveReload?.getScript() || ""}
    `,
  }),
});

const app = new Hono()
  // Serve static files
  .use("/assets/*", serveStatic({ root: "./examples/docs-viewer/public" }))
  .use("/styles/*", serveStatic({ root: "./examples/docs-viewer/public" }))
  // Routes
  .get("/", (c) => c.redirect("/docs"))
  // Live reload WebSocket endpoint
  .get("/_live", (c) => {
    if (!liveReload) return c.text("Live reload disabled");
    
    const { response, socket } = Deno.upgradeWebSocket(c.req.raw);
    liveReload.handleSocket(socket);
    return response;
  })
  .route("/docs", 
    reface
      .page("/", () => <DocsViewer sections={sections} />)
      .page("/:section", ({ params }) => (
        <DocsViewer 
          sections={sections} 
          currentPath={params.section}
        />
      ))
      .page("/:section/:path", ({ params }) => (
        <DocsViewer 
          sections={sections} 
          currentPath={params.section + "/" + params.path} 
        />
      ))
      .hono()
  );

console.log(`Server running at http://localhost:8000 (${isDev ? "development" : "production"} mode)`);
await Deno.serve(app.fetch);