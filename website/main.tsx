import { Hono } from 'hono'
import { serveStatic } from 'hono/deno'
import { Reface, createElement } from "@reface";
import { clean } from "@reface/layouts";
import { loadDocs } from "./utils/docs.tsx";
import { DocsViewer } from "./components/DocsViewer.tsx";
import { Home } from "./components/Home.tsx";
import { resolveFromFile } from "./utils/resolveFromFile.ts";

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

app.route("/", home);
app.route("/docs", docs);

await Deno.serve(app.fetch);