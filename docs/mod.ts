// docs/mod.ts
import { dirname, join } from "https://deno.land/std@0.220.0/path/mod.ts";

export interface DocItem {
  slug: string;
  title: string;
  content: string;
}

function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : "Untitled";
}

function createSlug(filename: string): string {
  return filename
    .toLowerCase()
    .replace(/\.md$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function loadDocFiles(): Promise<DocItem[]> {
  const docs: DocItem[] = [];
  const docsDir = dirname(new URL(import.meta.url).pathname);

  // Load README.md first
  try {
    const readmePath = join(docsDir, "../README.md");
    const content = await Deno.readTextFile(readmePath);
    docs.push({
      slug: "readme",
      title: "Introduction",
      content,
    });
  } catch (error) {
    console.error("Error loading README.md:", error);
  }

  // Load docs from current directory
  for await (const entry of Deno.readDir(docsDir)) {
    if (entry.isFile && entry.name.endsWith(".md")) {
      try {
        const filePath = join(docsDir, entry.name);
        const content = await Deno.readTextFile(filePath);

        docs.push({
          slug: createSlug(entry.name),
          title: extractTitle(content),
          content,
        });
      } catch (error) {
        console.error(`Error loading ${entry.name}:`, error);
      }
    }
  }

  return docs;
}
