import { Reface, clean } from "../../source/mod.ts";
import { Hono } from "@hono/hono";
import { loadDocs } from "./utils/docs.ts";
import { DocsViewer } from "./components/DocsViewer.tsx";

import { createElement } from "../../source/mod.ts";

// App initialization
const sections = await loadDocs("./docs");

if (!sections.length) {
  console.error("No documentation sections found!");
}

const reface = new Reface({
  layout: clean({
    title: "Reface Documentation",
    description: "Modern Template Engine for Server-Side Applications",
    favicon: "/_assets/favicon.ico",
    htmx: true,
    bootstrap: true,
    head: `
      <link rel="stylesheet" href="https://esm.sh/prismjs@1.29.0/themes/prism.css">
      <script src="https://esm.sh/prismjs@1.29.0/components/prism-core.min.js"></script>
      <script src="https://esm.sh/prismjs@1.29.0/components/prism-markup.min.js"></script>
      <script src="https://esm.sh/prismjs@1.29.0/components/prism-typescript.min.js"></script>
      <script src="https://esm.sh/prismjs@1.29.0/components/prism-javascript.min.js"></script>
    `,
  }),
});

const app = new Hono()
  .get("/", (c) => c.redirect("/docs"))
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

Deno.serve(app.fetch);