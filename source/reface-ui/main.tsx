import { LiveReloadPlugin, Reface } from "@reface";
import { Hono } from "@hono/hono";
import { loadStories, loadStory, ReStory } from "@restory";
import { RefaceUI } from "./RefaceUI.tsx";
const IS_DEV = true;

const app = new Hono();

const reface = new Reface({});

if (IS_DEV) {
  reface.composer.use(new LiveReloadPlugin({ watchPaths: ["./"] }));
}

reface.hono(app);

app.get("/iframe/*", async (c) => {
  const currentPath = c.req.path.replace("/iframe", "");

  const story = await loadStory(currentPath, Deno.cwd() + "/@reface-ui");

  if (!story) {
    return c.text("Story not found", 404);
  }

  return c.html(
    reface.render(
      <RefaceUI>
        {story.component()}
      </RefaceUI>,
    ),
  );
});

app.get("/*", async (c) => {
  const currentPath = c.req.path;
  const stories = await loadStories(Deno.cwd() + "/@reface-ui");

  return c.html(
    reface.render(
      <ReStory
        stories={stories}
        currentPath={currentPath}
      />,
    ),
  );
});

export default app;
