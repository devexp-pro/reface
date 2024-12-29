import { expandGlobSync } from "jsr:@std/fs/expand-glob";
import { dirname, isAbsolute, relative, resolve } from "jsr:@std/path";
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

const IS_DEV = Deno.env.get("DEV") === "true";

export async function loadStoryFile(
  storyFileName: string,
  rootDir: string,
): Promise<StoryFile> {
  // HACK: Deno deploy doesn't support absolute paths, so we need to use relative paths with static part
  const storyPath = relative(
    dirname(new URL(import.meta.url).pathname),
    storyFileName,
  );
  const storyModule: StoryModule = await import(`./${storyPath}`);
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
  const rootDir = isAbsolute(root) ? root : resolve(Deno.cwd(), root);
  const storyFileNames = getStoryFileNames(rootDir);

  const files: StoryFile[] = [];

  for (const storyFileName of storyFileNames) {
    files.push(await loadStoryFile(storyFileName, rootDir));
  }

  return files;
}

function extractComponentSource(source: string, componentName: string): string {
  const regex = new RegExp(
    `export\\s+const\\s+${componentName}\\s*=\\s*component\\s*\\([\\s\\S]*?\\);`,
    "m",
  );

  const match = source.match(regex);

  if (match) {
    return match[0];
  }

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
