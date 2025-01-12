import type { DocPage, DocSection } from "../types.ts";

export function generateDocsStructure(
  pages: Map<string, DocPage>,
): DocSection[] {
  const sections = new Map<string, DocSection>();

  sections.set("getting-started", {
    title: "Getting Started",
    items: [],
  });

  for (const [path, page] of pages.entries()) {
    const parts = path.split("/");
    const section = parts.length > 1 ? parts[0] : "other";

    if (!sections.has(section)) {
      sections.set(section, {
        title: section.split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        items: [],
      });
    }

    sections.get(section)!.items.push({
      path,
      title: page.title,
    });
  }

  for (const section of sections.values()) {
    section.items.sort((a, b) => {
      if (a.path === "readme") return -1;
      if (b.path === "readme") return 1;

      return a.title.localeCompare(b.title);
    });
  }

  return Array.from(sections.values())
    .sort((a, b) => {
      if (a.title === "Getting Started") return -1;
      if (b.title === "Getting Started") return 1;

      return a.title.localeCompare(b.title);
    });
}
