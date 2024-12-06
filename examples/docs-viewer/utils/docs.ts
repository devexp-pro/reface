import { walk } from "https://deno.land/std@0.210.0/fs/walk.ts";
import { join } from "https://deno.land/std@0.210.0/path/mod.ts";
import { parseMarkdown, type ParsedMarkdown } from "./markdown.ts";

export interface DocPage {
  path: string;
  title: string;
  content: ParsedMarkdown;
}

export interface DocSection {
  title: string;
  pages: DocPage[];
}

export async function loadDocs(docsDir: string): Promise<DocSection[]> {
  console.log("Loading docs from:", docsDir);
  const sections: DocSection[] = [];

  try {
    // Walk through docs directory
    for await (const entry of walk(docsDir, {
      includeDirs: false,
      exts: [".md"],
      skip: [/_/], // Skip files/folders starting with _
    })) {
      const content = await Deno.readTextFile(entry.path);
      const relativePath = entry.path
        .replace(docsDir + "/", "")
        .replace(/\.md$/, "");
      const [section, ...rest] = relativePath.split("/");

      // Parse markdown
      const parsed = parseMarkdown(content);
      const title = parsed.headings[0]?.text || rest.join("/");

      // Add to sections
      let sectionObj = sections.find((s) => s.title === section);
      if (!sectionObj) {
        sectionObj = { title: section, pages: [] };
        sections.push(sectionObj);
      }

      sectionObj.pages.push({
        path: rest.join("/"),
        title,
        content: parsed,
      });
    }

    return sections;
  } catch (error) {
    console.error("Error loading docs:", error);
    return [];
  }
}
