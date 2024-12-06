import { Hono } from "@hono/hono";
import { Reface, clean, component, island, RESPONSE } from "@vseplet/reface";
import {
  div,
  aside,
  main,
  nav,
  a,
  h1,
  p,
  createElement,
} from "@vseplet/reface/dom";
import { readDocsTree } from "./utils/docs.ts";
import type { DocItem } from "./utils/docs.ts";
import { markdownToHtml } from "./utils/markdown.ts";

// Вместо styled компонентов используем обычные классы
const Navigation = island<{ loadDoc: { path: string } }, { docs: DocItem[] }>({
  template: ({ props, rpc }) => (
    <aside class="sidebar">
      <nav>
        {props.docs.map((doc) => (
          <div class="nav-item">
            <a
              class="nav-link"
              href="#"
              {...rpc.hx.loadDoc({ path: doc.path })}
              hx-target="#content"
            >
              {doc.title}
            </a>
          </div>
        ))}
      </nav>
    </aside>
  ),
  rpc: {
    loadDoc: async ({ args }) => {
      const content = await Deno.readTextFile(args.path);
      const html = await markdownToHtml(content);
      return RESPONSE(<div innerHTML={html}></div>);
    },
  },
});

// Main page component
const DocsPage = component<{ docs: DocItem[] }>(({ docs }) => (
  <div class="container">
    <Navigation docs={docs} />
    <main id="content" class="content">
      <h1>Welcome to Reface Documentation</h1>
      <p>Select a document from the sidebar to begin.</p>
    </main>
  </div>
));

// Initialize app
const docs = await readDocsTree("./docs");

const app = new Hono().route(
  "/",
  new Reface({
    layout: clean({
      htmx: true,
      jsonEnc: true,
      bootstrap: true,
      head: `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/firacode@6.2.0/distr/fira_code.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism.css">
        <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-typescript.min.js"></script>
        <style>
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
          }
          .sidebar {
            width: 250px;
            padding: 1rem;
            border-right: 1px solid #eee;
            height: 100vh;
            position: fixed;
            overflow-y: auto;
          }
          .nav-item {
            padding: 0.5rem 0;
          }
          .nav-link {
            color: #333;
            text-decoration: none;
          }
          .nav-link:hover {
            color: #007bff;
          }
          .nav-link.active {
            color: #007bff;
            font-weight: bold;
          }
          .content {
            margin-left: 270px;
            padding: 1rem;
          }
          pre {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 4px;
            overflow-x: auto;
          }
          code {
            font-family: 'Fira Code', monospace;
          }
        </style>
      `,
    }),
  })
    .page("/", () => DocsPage({ docs }))
    .hono()
);

Deno.serve(app.fetch); 