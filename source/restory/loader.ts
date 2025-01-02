import { expandGlobSync } from "jsr:@std/fs/expand-glob";
import { relative, resolve, toFileUrl } from "jsr:@std/path";
import type { Template } from "@reface/recast";
import type { Story, StoryFile, StoryModule } from "./types.ts";

const getStoryFileNames = (rootDir: string) => {
  return Array.from(
    expandGlobSync("**/*.story.tsx", {
      root: rootDir,
      includeDirs: false,
      followSymlinks: false,
    }),
  ).map((entry) => entry.path);
};

export async function loadStoryFile(
  storyFileName: string,
  rootDir: string,
): Promise<StoryFile> {
  const storyModule: StoryModule = await import(
    toFileUrl(storyFileName).href
  );
  const relativePath = relative(rootDir, storyFileName);
  const sourceCode = await Deno.readTextFile(storyFileName);

  const stories: Story[] = Object.entries(storyModule)
    .filter(([key, value]) =>
      key !== "meta" &&
      typeof value === "function" &&
      key !== "default"
    )
    .map(([key, component]) => {
      const componentSource = extractComponentSource(sourceCode, key);

      return {
        name: key,
        component: component as () => Template,
        source: componentSource,
      };
    });

  return {
    filePath: relativePath,
    stories,
    meta: storyModule.meta,
  };
}

export async function loadStories(root: string): Promise<StoryFile[]> {
  const rootDir = resolve(Deno.cwd(), root);
  const storyFileNames = getStoryFileNames(rootDir);

  const files: StoryFile[] = [];

  for (const storyFileName of storyFileNames) {
    files.push(await loadStoryFile(storyFileName, rootDir));
  }

  return files;
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
  root: string,
  path: string,
  storyName: string,
): Promise<Story | null> {
  try {
    const storyFile = await loadStoryFile(resolve(root, path), root);
    return storyFile.stories.find((story) => story.name === storyName) ?? null;
  } catch (error) {
    console.error(`Failed to load story: ${path}`, error);
    return null;
  }
}
