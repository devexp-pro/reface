import { createElement } from "@reface/jsx";
import { Reface } from "@reface";
import { clean } from "@reface/layouts";
import { Hono } from "https://deno.land/x/hono@v3.11.7/mod.ts";
import { serveStatic } from "https://deno.land/x/hono@v3.11.7/middleware.ts";
import { loadDocs } from "./utils/docs.tsx";
import { DocsViewer } from "./components/DocsViewer.tsx";
import { Home } from "./components/Home.tsx";

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
    title: "Reface - Modern Template Engine",
    description: "Type-safe template engine for HTML with JSX support",
    favicon: "/assets/logo.png",
    head: `
      <link rel="stylesheet" href="/styles/fonts.css">
      <link rel="icon" type="image/png" href="/assets/logo.png">
    `,
  }),
});

const app = new Hono();

// Статические файлы
app.use("/assets/*", serveStatic({ root: "./website/public" }));
app.use("/styles/*", serveStatic({ root: "./website/public" }));

// Создаем роутеры
const home = reface.page("/", Home).hono();
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
  ))
  .hono();

// Маршрутизация
app.route("/", home);
app.route("/docs", docs);

console.log("Server running at http://localhost:8000");
await Deno.serve(app.fetch);