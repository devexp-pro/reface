import * as path from "jsr:@std/path";
import { cyan, dim, gray, white, yellow } from "jsr:@std/fmt/colors";
import { Reface } from "@reface";
import { Hono } from "@hono/hono";
import { LiveReloadPlugin } from "@reface/plugins/liveReload";
import { loadStories, loadStory, ReStory } from "./mod.tsx";
import { RefaceUI } from "@reface-ui";

// Проверка аргументов
if (Deno.args.length === 0) {
  console.error("Please provide root path for stories");
  Deno.exit(1);
}

const ROOT_PATH = path.resolve(Deno.cwd(), Deno.args[0]);
const IS_DEV = true;
const PORT = 3000;

// Красивый вывод информации
console.clear();
console.log(`${gray("{ ")}${white("Re")} ${cyan("Story")} ${gray("}")}`);
console.log();
console.log(
  `${dim("Root:")}    ${yellow(path.join(Deno.args[0], "**/*.story.tsx"))}`,
);
console.log(
  `${dim("Mode:")}    ${IS_DEV ? cyan("development") : white("production")}`,
);
console.log(`${dim("Server:")}  ${cyan(`http://localhost:${PORT}`)}`);
console.log();
console.log(dim("Starting server..."));
console.log();

// Инициализация приложения
const app = new Hono();
const reface = new Reface({});

if (IS_DEV) {
  reface.composer.use(new LiveReloadPlugin({ watchPaths: [ROOT_PATH] }));
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
await Deno.serve({ port: PORT }, app.fetch);
