import * as path from "jsr:@std/path";
import { cyan, dim, red, yellow } from "jsr:@std/fmt/colors";
import { LiveReloadPlugin, Reface } from "@reface";
import { Hono } from "@hono/hono";
import { ReDocs } from "./ReDocs.tsx";
import { loadDocs } from "./loader/mod.ts";

const IS_CHILD = Deno.env.get("REDOCS_CHILD") === "true";
const IS_DEV = Deno.env.get("REDOCS_ENV") !== "production";

interface ReDocsConfig {
  port?: number;
  watch?: boolean;
  docsPath: string;
}

function printInfo(...messages: string[]) {
  console.log("");
  console.log(cyan("ReDocs"), dim("-"), ...messages);
  console.log("");
}

async function watchAndRestart(config: ReDocsConfig) {
  if (IS_CHILD) {
    await startServer(config);
    return;
  }

  let process: Deno.Process | null = null;
  let restarting = false;

  const restart = async () => {
    if (restarting) return;
    restarting = true;

    console.clear();
    console.log("Restarting documentation server...");

    if (process) {
      try {
        process.kill("SIGTERM");
        await process.status();
      } catch (e) {
        // Игнорируем ошибки при убийстве процесса
      }
    }

    process = new Deno.Command("deno", {
      args: ["run", "-A", Deno.mainModule, ...Deno.args],
      stdout: "inherit",
      stderr: "inherit",
      env: {
        REDOCS_CHILD: "true",
        REDOCS_ENV: IS_DEV ? "development" : "production",
      },
    }).spawn();

    restarting = false;
  };

  await restart();

  if (config.watch) {
    let timeout: number | null = null;
    const watcher = Deno.watchFs(config.docsPath, { recursive: true });

    for await (const event of watcher) {
      if (event.kind === "modify") {
        const isRelevant = event.paths.some((path) =>
          path.endsWith(".md") ||
          path.endsWith(".mdx")
        );

        if (isRelevant) {
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(() => restart(), 100);
        }
      }
    }
  }
}

async function startServer(config: ReDocsConfig) {
  const PORT = config.port || 3000;
  const DOCS_PATH = path.resolve(Deno.cwd(), config.docsPath);

  // Проверяем существование директории
  try {
    const stat = await Deno.stat(DOCS_PATH);
    if (!stat.isDirectory) {
      throw new Error("Not a directory");
    }
  } catch (e) {
    console.error(red(`Error: Directory '${config.docsPath}' does not exist`));
    Deno.exit(1);
  }

  printInfo(
    `Serving docs from ${yellow(config.docsPath)}`,
    `at ${yellow(`http://localhost:${PORT}`)}`,
    config.watch ? dim("(watching for changes)") : "",
  );

  const app = new Hono();
  const reface = new Reface({});

  if (IS_DEV && config.watch) {
    reface.composer.use(
      new LiveReloadPlugin({
        watchPaths: [DOCS_PATH],
      }),
    );
  }

  const docs = await loadDocs(DOCS_PATH);

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

  await Deno.serve({
    port: PORT,
  }, app.fetch);
}

if (import.meta.main) {
  const args = Deno.args;
  const config: ReDocsConfig = {
    port: 3000,
    watch: true,
    docsPath: args[0] || ".", // Первый аргумент - путь до документации
  };

  // Дополнительные опции через флаги
  for (let i = 1; i < args.length; i++) {
    const arg = args[i];
    const nextArg = args[i + 1];

    switch (arg) {
      case "--port":
      case "-p":
        config.port = parseInt(nextArg);
        i++;
        break;
      case "--no-watch":
        config.watch = false;
        break;
    }
  }

  await watchAndRestart(config);
}
