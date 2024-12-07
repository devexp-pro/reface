import { createElement } from "@reface/jsx";
import { Reface } from "@reface";
import { clean } from "@reface/layouts";
import { Hono } from "https://deno.land/x/hono@v3.11.7/mod.ts";
import { serveStatic } from "https://deno.land/x/hono@v3.11.7/middleware.ts";
import { loadDocs } from "./utils/docs.tsx";
import { DocsViewer } from "./components/DocsViewer.tsx";

// Загружаем документацию
const { sections, pages } = await loadDocs(".");

if (!pages.size) {
  console.error("No documentation found!");
  console.log("Make sure you have documentation files in ./docs directory");
  Deno.exit(1);
}

// Инициализируем приложение
const reface = new Reface({
  layout: clean({
    title: "Reface Documentation",
    description: "Type-safe template engine for HTML with JSX support",
    favicon: "/assets/favicon.svg",
    head: `
      <link rel="stylesheet" href="/styles/fonts.css">
      <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
    `,
  }),
});

const app = new Hono();

// Статические файлы
app.use("/assets/*", serveStatic({ root: "./docs-viewer/public" }));
app.use("/styles/*", serveStatic({ root: "./docs-viewer/public" }));

// Маршруты
app.get("/", (c) => c.redirect("/docs"));

// Документация
const docs = reface
  .page("/", () => (
    <DocsViewer 
      sections={sections} 
      pages={pages}
    />
  ))
  .page("/:page", ({ params }) => (
    <DocsViewer 
      sections={sections}
      pages={pages}
      currentPath={params.page}
    />
  ));

app.route("/docs", docs.hono());

console.log("Server running at http://localhost:8000");
await Deno.serve(app.fetch);