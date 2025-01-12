import * as path from "jsr:@std/path";
import { LiveReloadPlugin, reface, setupReface } from "@reface";
import { serveStatic } from "@hono/hono/deno";

import { component, html } from "@recast";
import { loadStories, ReStory } from "@restory";
import { loadDocs, loadScriptFiles, ReDocs } from "@redocs";
import { LayoutSimple, RefaceUI } from "@reface-ui";
import { globalStyles } from "@reface-ui/theme";

import { resolveFromFile } from "./utils/resolveFromFile.ts";
import HomePage from "./home/Home.tsx";

import "../source/reface-ui/stories.ts";

const IS_DEV = Deno.env.get("DEV") === "true";

const docsRootPath = path.resolve(Deno.cwd(), "./docs");
const restoryRootPath = path.resolve(Deno.cwd(), "./source/reface-ui");
const docs = await loadDocs(docsRootPath);
const scripts = await loadScriptFiles([
  path.resolve(Deno.cwd(), "./source/recast/mod.ts"),
]);
const stories = await loadStories(restoryRootPath);

const Layout = component((_, children) => (
  <LayoutSimple
    title="Reface - Modern Template Engine"
    description="Type-safe template engine for HTML with JSX support"
    favicon="/assets/logo.png"
    normalizeCss
    htmx
    head={
      <>
        <link rel="stylesheet" href="/styles/index.css" />
        <link rel="icon" type="image/png" href="/assets/logo.png" />
        <style>{html(globalStyles)}</style>
      </>
    }
  >
    {children}
  </LayoutSimple>
));

setupReface({
  layout: Layout,
});

if (IS_DEV) {
  reface.recast.use(new LiveReloadPlugin({ watchPaths: ["./"] }));
}

reface.router.use(
  "/assets/*",
  serveStatic({ root: resolveFromFile("./public", import.meta.url) }),
);
reface.router.use(
  "/styles/*",
  serveStatic({ root: resolveFromFile("./public", import.meta.url) }),
);

reface.router.get("/", (c) => c.render(<HomePage />));

reface.router.get("/docs/:path{.*}?", (c) =>
  c.render(
    ReDocs({
      sections: docs.sections,
      pages: docs.pages,
      scripts,
      currentPath: c.req.param("path") || "readme",
      publicPath: "/docs/",
    }),
  ));

reface.router.get("/restory/iframe/:path{.*}", (c) => {
  const storyFile = stories.find((storyFile) =>
    storyFile.filePath === c.req.param("path")
  );
  const story = storyFile?.stories.find((story) =>
    story.name === c.req.query("story")
  );

  if (!story) {
    return c.text("Story not found", 404);
  }

  return c.render(RefaceUI`${story.component()}`);
});

reface.router.get("/restory/:path{.*}?", (c) => {
  return c.render(
    ReStory({
      stories,
      currentPath: c.req.param("path"),
      currentStory: c.req.query("story"),
      publicPath: "/restory/",
    }),
  );
});

Deno.serve(reface.fetch);
