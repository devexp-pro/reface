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
  id: string;
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

export async function loadStories(
  rootDir: string,
  version?: string | number,
): Promise<StoryFile[]> {
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
    const fileUrl = `file://${file}${version ? "#" + version : ""}`;
    const storyModule: StoryModule = await import(fileUrl);
    const relativePath = relative(absolutePath, file);
    const sourceCode = await Deno.readTextFile(file);

    // Получаем базовый путь для ID (без .story.tsx)
    const baseId = relativePath.replace(/\.story\.tsx$/, "");

    const groupName = storyModule.meta?.title?.split("/")[0] ||
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

    Object.entries(storyModule)
      .filter(([key, value]) =>
        key !== "meta" &&
        typeof value === "function" &&
        key !== "default"
      )
      .forEach(([key, component]) => {
        // Формируем ID в формате "path/to/component---storyName"
        const id = `${baseId}---${key.toLowerCase()}`;
        const storyPath = `/${groupName.toLowerCase()}/${
          basename(file).replace(".story.tsx", "")
        }/${key.toLowerCase()}`;

        const componentSource = extractComponentSource(sourceCode, key);

        group!.stories.push({
          id,
          name: key,
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
  version: string | number,
): Promise<Story | null> {
  try {
    // Нормализуем путь и разбиваем на части
    const normalizedPath = path.toLowerCase().replace(/^\/+|\/+$/g, "");
    const [groupName, componentName, storyName] = normalizedPath.split("/");

    // Формируем ID истории
    const storyId = `${groupName}/${componentName}---${storyName}`;

    // Загружаем все истории
    const groups = await loadStories(rootDir, version);

    // Ищем историю по ID
    for (const group of groups) {
      const story = group.stories.find((s) => s.id.toLowerCase() === storyId);
      if (story) return story;
    }

    return null;
  } catch (error) {
    console.error(`Failed to load story: ${path}`, error);
    return null;
  }
}
