import { parseMarkdown } from "../markdown/parser.tsx";
import type { DocFile, DocPage, DocSection } from "../types.ts";
import { generateDocsStructure } from "./structure.ts";

export async function loadDocs(rootPath: string): Promise<{
  sections: DocSection[];
  pages: Map<string, DocPage>;
}> {
  const pages = new Map<string, DocPage>();
  const docFiles = await loadDocFiles(rootPath);

  for (const doc of docFiles) {
    const parsed = parseMarkdown(doc.content);
    pages.set(doc.slug, {
      path: doc.slug,
      title: doc.title,
      content: parsed,
    });
  }

  const sections = generateDocsStructure(pages);
  return { sections, pages };
}

async function loadDocFiles(rootPath: string): Promise<DocFile[]> {
  const files: DocFile[] = [];

  async function scanDir(dir: string) {
    for await (const entry of Deno.readDir(dir)) {
      const path = `${dir}/${entry.name}`;

      if (entry.isDirectory) {
        await scanDir(path);
        continue;
      }

      if (entry.isFile && entry.name.endsWith(".md")) {
        const content = await Deno.readTextFile(path);
        const relativePath = path.replace(rootPath, "").replace(/^\//, "");
        const slug = relativePath.replace(".md", "");

        const { title, content: cleanContent } = extractFrontmatter(content);

        files.push({
          slug,
          title: title || entry.name.replace(".md", ""),
          content: cleanContent,
        });
      }
    }
  }

  await scanDir(rootPath);
  return files;
}

function extractFrontmatter(
  content: string,
): { title?: string; content: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    return { content };
  }

  const [, frontmatter, mainContent] = match;
  const metadata = Object.fromEntries(
    frontmatter.split("\n")
      .map((line) => line.split(":").map((part) => part.trim()))
      .filter((parts) => parts.length === 2),
  );

  return {
    title: metadata.title,
    content: mainContent.trim(),
  };
}
