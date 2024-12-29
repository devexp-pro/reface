import { blue, cyan, dim, gray, white, yellow } from "jsr:@std/fmt/colors";
import { LiveReloadPlugin, Reface } from "@reface";
import { Hono } from "@hono/hono";
import { createCLI } from "../common/cli.ts";
import { loadStories, loadStory } from "./loader.ts";
import { ReStory } from "./ReStory.tsx";
import { RefaceUI } from "@reface-ui";

const cli = createCLI({
  name: "Re Story",
  childEnvKey: "RESTORY_CHILD",
  port: 3000,
  rootPath: Deno.args[0],
  watchPaths: ["."],
  watchExtensions: [".tsx", ".ts", ".css"],
});

async function startServer() {
  const rootPath = cli.validateRootPath();

  cli.printInfo([
    `${gray("{")} ${white("Re")} ${cyan("Story")} ${gray("}")}`,
    "",
    `${dim("Root:")}    ${yellow(rootPath)}`,
    `${dim("Mode:")}    ${
      cli.IS_DEV ? cyan("development") : white("production")
    }`,
    `${dim("Server:")}  ${cyan(`http://localhost:${cli.port}`)}`,
  ]);

  const app = new Hono();
  const reface = new Reface({});

  if (cli.IS_DEV) {
    reface.recast.use(
      new LiveReloadPlugin({
        watchPaths: [rootPath],
      }),
    );
  }

  reface.hono(app);

  app.get("/iframe/:path{.*}", async (c) => {
    const story = await loadStory(
      rootPath,
      c.req.param("path")!,
      c.req.query("story")!,
    );

    if (!story) {
      return c.text("Story not found", 404);
    }

    return c.html(
      reface.render(
        RefaceUI`${story.component()}`,
      ),
    );
  });

  app.get("/:path{.*}?", async (c) => {
    const stories = await loadStories(rootPath);

    return c.html(
      reface.render(
        ReStory({
          stories,
          currentPath: c.req.param("path"),
          currentStory: c.req.query("story"),
        }),
      ),
    );
  });

  await Deno.serve({ port: cli.port }, app.fetch);
}

if (import.meta.main) {
  await cli.watchAndRestart(startServer);
}
