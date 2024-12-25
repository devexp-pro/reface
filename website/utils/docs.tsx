import { parseMarkdown } from "../modules/markdown/mod.tsx";
import type { ParsedMarkdown } from "../modules/markdown/types.ts";
import { type DocItem, loadDocFiles } from "../../docs/mod.ts";

export interface DocPage {
  path: string;
  title: string;
  content: ParsedMarkdown;
}

export interface DocSection {
  title: string;
  items: Array<{
    path: string;
    title: string;
  }>;
}

function generateDocsStructure(pages: Map<string, DocPage>): DocSection[] {
  const gettingStarted: DocSection = {
    title: "Getting Started",
    items: [
      { path: "readme", title: "Introduction" },
      { path: "architecture", title: "Architecture" },
    ],
  };

  const core: DocSection = {
    title: "Core",
    items: [],
  };

  for (const [path, page] of pages.entries()) {
    if (path === "readme" || path === "architecture") continue;

    core.items.push({
      path,
      title: page.title,
    });
  }

  core.items.sort((a, b) => a.title.localeCompare(b.title));

  return [gettingStarted, core];
}

export async function loadDocs(): Promise<{
  sections: DocSection[];
  pages: Map<string, DocPage>;
}> {
  const pages = new Map<string, DocPage>();

  const docFiles = await loadDocFiles();

  for (const doc of docFiles) {
    const parsed = parseMarkdown(doc.content);
    pages.set(doc.slug, {
      path: doc.slug,
      title: doc.title,
      content: parsed,
    });
  }

  const sections = generateDocsStructure(pages);

  return {
    sections,
    pages,
  };
}
