// Функции для работы с путями в Deno
function basename(path: string): string {
  return path.split("/").pop() || "";
}

function dirname(path: string): string {
  return path.split("/").slice(0, -1).join("/");
}

function relative(from: string, to: string): string {
  const fromParts = from.split("/");
  const toParts = to.split("/");

  while (fromParts.length && toParts.length && fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }

  return toParts.join("/");
}

export type StoryMeta = {
  title?: string;
  description?: string;
  component?: any;
};

export type StoryModule = {
  meta?: StoryMeta;
  [key: string]: any;
};

export type Story = {
  name: string;
  component: () => JSX.Element;
  path: string;
  filePath: string;
  source: string;
};

export type StoryFile = {
  name: string;
  stories: Story[];
  filePath: string;
  meta?: StoryMeta;
};

export async function loadStories(rootDir: string): Promise<StoryFile[]> {
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

  const groups: Map<string, StoryFile> = new Map();

  for (const file of storyFiles) {
    const fileUrl = `file://${file}`;
    const storyModule: StoryModule = await import(fileUrl);
    const relativePath = relative(absolutePath, file);
    const sourceCode = await Deno.readTextFile(file);

    // Получаем метаданные из модуля
    const meta = storyModule.meta;

    // Определяем имя группы из meta.title или из структуры папок
    const groupName = meta?.title?.split("/")[0] ||
      relativePath.split("/")[1] ||
      "Other";

    let group = groups.get(groupName);
    if (!group) {
      group = {
        name: groupName,
        stories: [],
        filePath: relativePath,
        meta: storyModule.meta,
      };
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

        // Извлекаем исходный код компонента с помощью регулярного выражения
        const componentSource = extractComponentSource(sourceCode, key);

        group!.stories.push({
          name: storyName,
          component: component as () => JSX.Element,
          path: storyPath,
          filePath: relativePath,
          source: componentSource || sourceCode,
        });
      });
  }

  return Array.from(groups.values());
}

// Функция для извлечения исходного кода конкретного компонента
function extractComponentSource(source: string, componentName: string): string {
  // Ищем экспортируемый компонент, учитывая возможные пробелы и переносы строк
  const regex = new RegExp(
    `export\\s+const\\s+${componentName}\\s*=\\s*component\\s*\\([\\s\\S]*?\\);`,
    "m",
  );

  const match = source.match(regex);

  if (match) {
    return match[0];
  }

  // Если не нашли компонент, возвращаем весь исходный код
  return source;
}

export async function loadStory(
  path: string,
  rootDir: string,
): Promise<Story | null> {
  try {
    const normalizedPath = path.toLowerCase().replace(/^\/+|\/+$/g, "");
    const storyFile = `${rootDir}/${
      normalizedPath.replace(/\/[^/]+$/, "")
    }.story.tsx`;
    const storyName = normalizedPath.split("/").pop();
    const sourceCode = await Deno.readTextFile(storyFile);
    const storyModule: StoryModule = await import(`file://${storyFile}`);

    const storyComponent = Object.entries(storyModule)
      .find(([key]) => key.toLowerCase() === storyName)?.[1];

    if (!storyComponent || typeof storyComponent !== "function") {
      return null;
    }

    // Извлекаем исходный код компонента
    const componentSource = extractComponentSource(sourceCode, storyName);

    return {
      name: storyName,
      component: storyComponent as () => JSX.Element,
      path: path,
      filePath: storyFile,
      source: componentSource || sourceCode,
    };
  } catch (error) {
    console.error(`Failed to load story: ${path}`, error);
    return null;
  }
}
