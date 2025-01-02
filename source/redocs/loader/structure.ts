import type { DocPage, DocSection } from "../types.ts";

export function generateDocsStructure(
  pages: Map<string, DocPage>,
): DocSection[] {
  const sections = new Map<string, DocSection>();

  // Добавляем базовые разделы
  sections.set("getting-started", {
    title: "Getting Started",
    items: [],
  });

  // Обрабатываем все страницы
  for (const [path, page] of pages.entries()) {
    const parts = path.split("/");
    const section = parts.length > 1 ? parts[0] : "other";

    // Создаем секцию если её нет
    if (!sections.has(section)) {
      sections.set(section, {
        title: section.split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        items: [],
      });
    }

    // Добавляем страницу в соответствующую секцию
    sections.get(section)!.items.push({
      path,
      title: page.title,
    });
  }

  // Сортируем элементы в каждой секции
  for (const section of sections.values()) {
    section.items.sort((a, b) => {
      // Readme всегда первый
      if (a.path === "readme") return -1;
      if (b.path === "readme") return 1;

      return a.title.localeCompare(b.title);
    });
  }

  // Преобразуем Map в массив и сортируем секции
  return Array.from(sections.values())
    .sort((a, b) => {
      // Getting Started всегда первый
      if (a.title === "Getting Started") return -1;
      if (b.title === "Getting Started") return 1;

      return a.title.localeCompare(b.title);
    });
}
