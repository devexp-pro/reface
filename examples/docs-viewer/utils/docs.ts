import { walk } from "https://deno.land/std@0.210.0/fs/walk.ts";
import { basename, extname } from "https://deno.land/std@0.210.0/path/mod.ts";

export interface DocItem {
  path: string;
  title: string;
  order: number;
}

export async function readDocsTree(root: string): Promise<DocItem[]> {
  const docs: DocItem[] = [];

  for await (const entry of walk(root, { exts: [".md"] })) {
    if (entry.isFile) {
      const content = await Deno.readTextFile(entry.path);
      const title =
        extractTitle(content) || basename(entry.path, extname(entry.path));
      const order = extractOrder(entry.path);

      docs.push({
        path: entry.path,
        title,
        order,
      });
    }
  }

  return docs.sort((a, b) => a.order - b.order);
}

function extractTitle(content: string): string | null {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : null;
}

function extractOrder(path: string): number {
  const match = basename(path).match(/^(\d+)-/);
  return match ? parseInt(match[1], 10) : 999;
}
