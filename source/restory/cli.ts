import * as path from "jsr:@std/path";
import { cyan, dim, gray, white, yellow } from "jsr:@std/fmt/colors";
import { LiveReloadPlugin, Reface } from "@reface";
import { Hono } from "@hono/hono";
import { loadStories, loadStory, ReStory } from "./mod.tsx";
import { RefaceUI } from "@reface/ui";

const IS_CHILD = Deno.env.get("RESTORY_CHILD") === "true";

async function watchAndRestart() {
  // Если это дочерний процесс, запускаем основной код
  if (IS_CHILD) {
    await startServer();
    return;
  }

  let process: Deno.Process | null = null;
  let restarting = false;

  const restart = async () => {
    if (restarting) return;
    restarting = true;

    console.clear();
    console.log("Restarting server...");

    // Убиваем предыдущий процесс если он есть
    if (process) {
      try {
        process.kill("SIGTERM");
        await process.status();
      } catch (e) {
        // Игнорируем ошибки при убийстве процесса
      }
    }

    // Запускаем новый процесс с флагом дочернего процесса
    process = new Deno.Command("deno", {
      args: ["run", "-A", Deno.mainModule, ...Deno.args],
      stdout: "inherit",
      stderr: "inherit",
      env: {
        RESTORY_CHILD: "true",
      },
    }).spawn();

    restarting = false;
  };

  // Первый запуск
  await restart();

  // Настраиваем watch с debounce
  let timeout: number | null = null;
  const watcher = Deno.watchFs(".", { recursive: true });

  for await (const event of watcher) {
    if (event.kind === "modify") {
      const isRelevant = event.paths.some((path) =>
        path.endsWith(".tsx") ||
        path.endsWith(".ts") ||
        path.endsWith(".css")
      );

      if (isRelevant) {
        // Debounce перезапуска
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(restart, 100);
      }
    }
  }
}

async function startServer() {
  // Проверка аргументов
  if (Deno.args.length === 0) {
    console.error("Please provide root path for stories");
    Deno.exit(1);
  }

  const ROOT_PATH = path.resolve(Deno.cwd(), Deno.args[0]);
  const IS_DEV = true;
  const PORT = 3000;

  let version: number = 1;

  // Функция для вывода информации
  function printInfo(event?: string) {
    console.clear();
    console.log(`${gray("{ ")}${white("Re")} ${cyan("Story")} ${gray("}")}`);
    console.log();
    console.log(
      `${dim("Root:")}    ${yellow(path.join(Deno.args[0], "**/*.story.tsx"))}`,
    );
    console.log(
      `${dim("Mode:")}    ${
        IS_DEV ? cyan("development") : white("production")
      }`,
    );
    console.log(`${dim("Server:")}  ${cyan(`http://localhost:${PORT}`)}`);

    if (event) {
      console.log();
      console.log(dim(`Event: ${event}`));
    }
    console.log();
  }

  // Начальный вывод
  printInfo(
    "Welcome to Restory! Visit http://localhost:3000 to browse your component stories and start developing",
  );

  // Инициализация приложения
  const app = new Hono();
  const reface = new Reface({});

  if (IS_DEV) {
    reface.composer.use(
      new LiveReloadPlugin({
        watchPaths: [ROOT_PATH],
      }),
    );
  }
  reface.hono(app);

  // Обработчик для iframe контента
  app.get("/iframe/*", async (c) => {
    const currentPath = c.req.path.replace("/iframe", "");
    const story = await loadStory(currentPath, ROOT_PATH);

    if (!story) {
      return c.text("Story not found", 404);
    }

    return c.html(
      reface.render(
        RefaceUI`${story.component()}`,
      ),
    );
  });

  // Основной обработчик
  app.get("/*", async (c) => {
    const currentPath = c.req.path;
    const stories = await loadStories(ROOT_PATH);

    return c.html(
      reface.render(
        ReStory({
          stories,
          currentPath,
        }),
      ),
    );
  });

  // Запускаем сервер
  await Deno.serve({
    port: PORT,
  }, app.fetch);
}

// Запускаем
await watchAndRestart();
