import { Fragment, createElement } from "../../../source/mod.ts";
import { walk } from "https://deno.land/std@0.210.0/fs/walk.ts";
import { parseMarkdown, type ParsedMarkdown } from "./markdown.tsx";

export interface DocPage {
  title: string;
  path: string;
  content: ParsedMarkdown;
  children?: DocPage[];
}

export interface DocSection {
  title: string;
  pages: DocPage[];
}

function formatTitle(str: string): string {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function buildPageTree(pages: DocPage[]): DocPage[] {
  const tree: DocPage[] = [];
  const lookup = new Map<string, DocPage>();

  // Сначала создаем lookup всех страниц и папок
  pages.forEach((page) => {
    const parts = page.path.split("/");
    
    // Создаем страницы для папок, если их еще нет
    if (parts.length > 1) {
      let currentPath = "";
      for (let i = 0; i < parts.length - 1; i++) {
        currentPath = currentPath ? `${currentPath}/${parts[i]}` : parts[i];
        if (!lookup.has(currentPath)) {
          // Создаем виртуальную страницу для папки
          lookup.set(currentPath, {
            path: currentPath,
            title: formatTitle(parts[i]),
            content: {
              content: <div>Folder Overview</div>,
              headings: [],
            },
            children: [],
          });
        }
      }
    }

    // Добавляем саму страницу с форматированным заголовком, если нет H1
    const pageTitle = page.title || formatTitle(parts[parts.length - 1]);
    lookup.set(page.path, { ...page, title: pageTitle, children: [] });
  });

  // Строим дерево
  pages.forEach((page) => {
    const parts = page.path.split("/");
    if (parts.length === 1) {
      // Корневые страницы
      tree.push(lookup.get(page.path)!);
    } else {
      // Вложенные страницы
      const parentPath = parts.slice(0, -1).join("/");
      const parent = lookup.get(parentPath);
      if (parent) {
        parent.children = parent.children || [];
        parent.children.push(lookup.get(page.path)!);
      } else {
        // Если родитель не найден, добавляем как корневую
        tree.push(lookup.get(page.path)!);
      }
    }
  });

  return tree;
}

export async function loadDocs(docsDir: string): Promise<DocSection[]> {
  console.log("Loading docs from:", docsDir);
  const sections = new Map<string, DocSection>();

  try {
    // Walk through docs directory
    for await (const entry of walk(docsDir, {
      includeDirs: false,
      exts: [".md"],
      skip: [/_/], // Skip files/folders starting with _
    })) {
      console.log("Found file:", entry.path);
      
      const content = await Deno.readTextFile(entry.path);
      const relativePath = entry.path
        .replace(/^docs\//, "")
        .replace(/\.md$/, "");
      
      // Разбираем путь на части
      const pathParts = relativePath.split("/");
      const sectionName = pathParts[0]; // Первая часть - это секция
      const pagePath = pathParts.slice(1).join("/"); // Остальное - путь страницы

      console.log("Processing:", {
        relativePath,
        sectionName,
        pagePath,
      });

      // Parse markdown
      const parsed = parseMarkdown(content);
      
      // Получаем или создаем секцию
      let section = sections.get(sectionName);
      if (!section) {
        section = {
          title: formatTitle(sectionName),
          pages: [],
        };
        sections.set(sectionName, section);
        console.log("Created new section:", section.title);
      }

      // Добавляем страницу в секцию
      section.pages.push({
        path: pagePath,
        title: parsed.headings[0]?.text || formatTitle(pathParts[pathParts.length - 1]),
        content: parsed,
      });
    }

    // Преобразуем страницы в дерево для каждой секции
    const result = Array.from(sections.values());
    result.forEach((section) => {
      section.pages = buildPageTree(section.pages);
    });

    // Сортируем секции по приоритету
    const sectionOrder = ["core", "html", "jsx", "styled", "examples"];
    result.sort((a, b) => {
      const aIndex = sectionOrder.indexOf(a.title.toLowerCase());
      const bIndex = sectionOrder.indexOf(b.title.toLowerCase());
      if (aIndex === -1 && bIndex === -1) return a.title.localeCompare(b.title);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

    console.log("Loaded sections:", result.map(s => ({
      title: s.title,
      pages: s.pages.map(p => ({
        path: p.path,
        title: p.title,
        hasChildren: Boolean(p.children?.length)
      }))
    })));

    return result;
  } catch (error) {
    console.error("Error loading docs:", error);
    return [];
  }
}
