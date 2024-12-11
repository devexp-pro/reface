import { Hono } from 'hono'
import { serveStatic } from 'hono/deno'
import { Reface, createElement } from "@reface";
import { clean } from "@reface/layouts";
import { loadDocs } from "./utils/docs.tsx";
import { resolveFromFile } from "./utils/resolveFromFile.ts";

import DocsPage from "./pages/DocsPage.tsx";
import HomePage from "./pages/HomePage.tsx";

const { sections, pages } = await loadDocs(resolveFromFile("../docs", import.meta.url));

if (!pages.size) {
  console.error("No documentation found!");
  console.log("Make sure you have documentation files in ./docs directory");
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
app.use("/assets/*", serveStatic({ root: resolveFromFile("./public", import.meta.url) }));
app.use("/styles/*", serveStatic({ root: resolveFromFile("./public", import.meta.url) }));

// Создаем роутеры
const home = reface.page("/", HomePage).hono();
const docs = reface
  .page("/", () => (
    <DocsPage 
      sections={sections} 
      pages={pages}
    />
  ))
  .page("/:page", ({ params }) => (
    <DocsPage 
      sections={sections}
      pages={pages}
      currentPath={params.page}
    />
  ))
  .hono();

app.route("/", home);
app.route("/docs", docs);

await Deno.serve(app.fetch);