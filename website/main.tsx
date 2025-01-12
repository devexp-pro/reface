import * as path from "jsr:@std/path";
import {
  component,
  html,
  LiveReloadPlugin,
  reface,
  setupReface,
} from "@reface";
import { loadStories, ReStory } from "@restory";
import { loadDocs, loadScriptFiles, ReDocs } from "@redocs";
import { LayoutSimple, RefaceUI } from "@reface-ui";
import { globalStyles } from "@reface-ui/theme";

import { serveStatic } from "@hono/hono/deno";

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

reface
  .page("/", <HomePage />)
  .page("/docs/:path{.*}?", ({ router }) =>
    ReDocs({
      sections: docs.sections,
      pages: docs.pages,
      scripts,
      currentPath: router.req.param("path") || "readme",
      publicPath: "/docs/",
    }))
  .use(
    "/assets/*",
    serveStatic({ root: path.resolve(Deno.cwd(), "./website/public") }),
  )
  .use(
    "/styles/*",
    serveStatic({ root: path.resolve(Deno.cwd(), "./website/public") }),
  )
  .page("/restory/iframe/:path{.*}", ({ router }) => {
    const storyFile = stories.find((storyFile) =>
      storyFile.filePath === router.req.param("path")
    );
    const story = storyFile?.stories.find((story) =>
      story.name === router.req.query("story")
    );

    if (!story) {
      return router.text("Story not found", 404);
    }

    return RefaceUI`${story.component()}`;
  })
  .page("/restory/:path{.*}?", ({ router }) =>
    ReStory({
      stories,
      currentPath: router.req.param("path"),
      currentStory: router.req.query("story"),
      publicPath: "/restory/",
    }));

Deno.serve(reface.fetch);
