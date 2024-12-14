import { marked } from "marked";
import type { ParsedMarkdown } from "./types.ts";
import { processToken } from "./tokens/block.tsx";
import { components } from "./components/mod.ts";

export * from "./components/mod.ts";

/**
 * Парсит markdown в компоненты Reface
 */
export function parseMarkdown(content: string): ParsedMarkdown {
  const tokens = marked.lexer(content);
  const headings: ParsedMarkdown["headings"] = [];

  // Собираем заголовки
  tokens.forEach((token) => {
    if (token.type === "heading") {
      headings.push({
        level: token.depth,
        text: token.text,
        slug: token.text.toLowerCase().replace(/[^\w]+/g, "-"),
      });
    }
  });

  return {
    content: (
      <components.DocContent>
        {tokens.map(processToken)}
      </components.DocContent>
    ),
    headings,
  };
}

/**
 * Создает оглавление из заголовков
 */
export function TableOfContents({ headings }: { headings: ParsedMarkdown["headings"] }) {
  if (!headings.length) return null;

  return (
    <components.TableOfContents>
      <h4>On this page</h4>
      <ul>
        {headings.map(heading => (
          <components.TocItem style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}>
            <components.TocLink href={`#${heading.slug}`}>
              {heading.text}
            </components.TocLink>
          </components.TocItem>
        ))}
      </ul>
    </components.TableOfContents>
  );
}

/**
 * Контейнер для markdown контента
 */
export function MarkdownContent({ children }: { children: ParsedMarkdown["content"] }) {
  return (
    <components.Content>
      {children}
    </components.Content>
  );
} 