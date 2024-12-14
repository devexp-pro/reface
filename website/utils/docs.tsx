import { parseMarkdown, type ParsedMarkdown } from "./markdown.tsx";
import { loadDocFiles, type DocItem } from "../../docs/mod.ts";

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
  // Readme всегда идет первым в Getting Started
  const gettingStarted: DocSection = {
    title: "Getting Started",
    items: [
      { path: "readme", title: "Introduction" },
      { path: "architecture", title: "Architecture" },
    ]
  };

  // Core содержит основные модули
  const core: DocSection = {
    title: "Core",
    items: []
  };

  // Распределяем остальные страницы
  for (const [path, page] of pages.entries()) {
    // Пропускаем readme и architecture, они уже в Getting Started
    if (path === "readme" || path === "architecture") continue;

    core.items.push({
      path,
      title: page.title
    });
  }

  // Сортируем items по title
  core.items.sort((a, b) => a.title.localeCompare(b.title));

  return [gettingStarted, core];
}

export async function loadDocs(): Promise<{
  sections: DocSection[];
  pages: Map<string, DocPage>;
}> {
  const pages = new Map<string, DocPage>();
  
  // Загружаем все файлы документации
  const docFiles = await loadDocFiles();
  
  // Создаем страницы из загруженных файлов
  for (const doc of docFiles) {
    const parsed = parseMarkdown(doc.content);
    pages.set(doc.slug, {
      path: doc.slug,
      title: doc.title,
      content: parsed
    });
  }

  // Генерируем структуру на основе загруженных страниц
  const sections = generateDocsStructure(pages);

  return {
    sections,
    pages
  };
}
