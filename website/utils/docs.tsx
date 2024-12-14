import { parseMarkdown, type ParsedMarkdown } from "./markdown.tsx";

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

// Определяем структуру документации
const DOCS_STRUCTURE: DocSection[] = [
  {
    title: "Getting Started",
    items: [
      { path: "readme", title: "Introduction" },
      { path: "architecture", title: "Architecture" },
    ]
  },
  {
    title: "Core Modules",
    items: [
      { path: "html", title: "HTML Module" },
      { path: "elements", title: "Elements" },
      { path: "elements@styled", title: "Styled Components" },
      { path: "jsx", title: "JSX Support" },
    ]
  }
];

export async function loadDocs(docsDir: string): Promise<{
  sections: DocSection[];
  pages: Map<string, DocPage>;
}> {
  const pages = new Map<string, DocPage>();

  // Загружаем все страницы
  for (const section of DOCS_STRUCTURE) {
    for (const item of section.items) {
      const filePath = `${docsDir}/${item.path}.md`;
      try {
        const content = await Deno.readTextFile(filePath);
        const parsed = parseMarkdown(content);
        
        pages.set(item.path, {
          path: item.path,
          title: item.title,
          content: parsed
        });
      } catch (error) {
        console.error(`Error loading ${filePath}:`, error);
      }
    }
  }

  return {
    sections: DOCS_STRUCTURE,
    pages
  };
}
