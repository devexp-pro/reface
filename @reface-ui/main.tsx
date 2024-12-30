import { Reface } from "@reface";
import { Hono } from "@hono/hono";
import { LiveReloadPlugin } from "@reface/plugins/liveReload";
import { loadStories, loadStory, ReStory } from "@restory";
import { RefaceUI } from "./RefaceUI.tsx";
const IS_DEV = true;

// Создаем Hono приложение
const app = new Hono();

// Инициализация приложения
const reface = new Reface({});

// Добавляем LiveReload в режиме разработки
if (IS_DEV) {
  reface.composer.use(new LiveReloadPlugin({ watchPaths: ["./"] }));
}

reface.hono(app);

// Обработчик для iframe контента
app.get("/iframe/*", async (c) => {
  const currentPath = c.req.path.replace("/iframe", "");

  // Загружаем историю по пути, добавляя корректный root путь
  const story = await loadStory(currentPath, Deno.cwd() + "/@reface-ui");

  if (!story) {
    return c.text("Story not found", 404);
  }

  // Рендерим только компонент истории без общего layout
  return c.html(
    reface.render(
      <RefaceUI>
        {story.component()}
      </RefaceUI>,
    ),
  );
});

// Основной обработчик
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
