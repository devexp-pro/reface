// Функции для работы с путями в Deno
function basename(path: string): string {
  return path.split("/").pop() || "";
}

function dirname(path: string): string {
  return path.split("/").slice(0, -1).join("/");
}

type StoryMeta = {
  title?: string;
  description?: string;
  component?: any;
};

type StoryModule = {
  meta?: StoryMeta;
  [key: string]: any;
};

type Story = {
  name: string;
  component: () => JSX.Element;
  path: string;
  meta?: StoryMeta;
};

type StoryGroup = {
  name: string;
  stories: Story[];
};

export async function loadStories(rootDir: string): Promise<StoryGroup[]> {
  // Преобразуем относительный путь в абсолютный
  const absolutePath = new URL(rootDir, import.meta.url).pathname;

  const storyFiles: string[] = [];

  async function scanDir(dir: string) {
    for await (const entry of Deno.readDir(dir)) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory) {
        await scanDir(path);
      } else if (entry.isFile && entry.name.endsWith(".story.tsx")) {
        storyFiles.push(path);
      }
    }
  }

  await scanDir(absolutePath);

  const groups: Map<string, StoryGroup> = new Map();

  for (const file of storyFiles) {
    // Используем file:// протокол для импорта
    const fileUrl = `file://${file}`;
    const storyModule: StoryModule = await import(fileUrl);

    // Получаем метаданные из модуля
    const meta = storyModule.meta;

    // Определяем имя группы из meta.title или из структуры папок
    const groupName = meta?.title?.split("/")[0] ||
      file.substring(absolutePath.length).split("/")[1] ||
      "Other";

    let group = groups.get(groupName);
    if (!group) {
      group = { name: groupName, stories: [] };
      groups.set(groupName, group);
    }

    // Собираем все экспортированные истории из модуля
    Object.entries(storyModule)
      .filter(([key, value]) =>
        key !== "meta" &&
        typeof value === "function" &&
        key !== "default"
      )
      .forEach(([key, component]) => {
        const storyName = key;
        const fileName = basename(file).replace(".story.tsx", "");
        const storyPath =
          `/${groupName.toLowerCase()}/${fileName}/${key.toLowerCase()}`;

        group!.stories.push({
          name: storyName,
          component: component as () => JSX.Element,
          path: storyPath,
          meta: storyModule.meta, // Добавляем метаданные к каждой истории
        });
      });
  }

  return Array.from(groups.values());
}
