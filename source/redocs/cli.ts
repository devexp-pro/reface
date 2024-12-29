import { blue, dim, white, yellow } from "jsr:@std/fmt/colors";
import { LiveReloadPlugin, Reface } from "@reface";
import { Hono } from "@hono/hono";
import { createCLI } from "../common/cli.ts";
import { ReDocs } from "./ReDocs.tsx";
import { loadDocs } from "./loader/mod.ts";

const cli = createCLI({
  name: "📚 Re Docs",
  childEnvKey: "REDOCS_CHILD",
  port: 3000,
  rootPath: Deno.args[0] || ".",
  watchPaths: [Deno.args[0] || "."],
  watchExtensions: [".md", ".mdx"],
});

async function startServer() {
  const rootPath = cli.validateRootPath();

  cli.printInfo([
    `Serving docs from ${yellow(rootPath)}`,
    `at ${yellow(`http://localhost:${cli.port}`)}`,
    cli.IS_DEV ? dim("(watching for changes)") : "",
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

  const docs = await loadDocs(rootPath);

  app.get("/*", async (c) => {
    const currentPath = c.req.path.replace(/^\//, "");
    return c.html(
      reface.render(
        ReDocs({
          sections: docs.sections,
          pages: docs.pages,
          currentPath: currentPath || "readme",
        }),
      ),
    );
  });

  await Deno.serve({ port: cli.port }, app.fetch);
}

if (import.meta.main) {
  await cli.watchAndRestart(startServer);
}
