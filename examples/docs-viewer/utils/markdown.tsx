import { createElement, ol, ul, li, a, img, p } from "../../../source/mod.ts";

import { marked } from "https://esm.sh/marked@9.1.5";
import { contentComponents } from "../components/Content.tsx";

interface Heading {
  level: number;
  text: string;
  slug: string;
}

export interface ParsedMarkdown {
  content: Template;
  headings: Heading[];
}

function createTemplate(tokens: marked.Token[]): Template {
  const elements: Template[] = [];

  for (const token of tokens) {
    switch (token.type) {
      case "paragraph":
        elements.push(<contentComponents.p>{token.text}</contentComponents.p>);
        break;

      case "heading":
        const HeadingComponent = [
          contentComponents.h1,
          contentComponents.h2,
          contentComponents.h3
        ][token.depth - 1] || contentComponents.h3;
        
        const slug = token.text.toLowerCase().replace(/[^\w]+/g, "-");
        elements.push(
          <HeadingComponent id={slug}>{token.text}</HeadingComponent>
        );
        break;

      case "list":
        const ListComponent = token.ordered ? ol : ul;
        const items = token.items.map((item) => li()`${item.text}`);
        elements.push(ListComponent()`${items.join("")}`);
        break;

      case "link":
        elements.push(a({ href: token.href })`${token.text}`);
        break;

      case "image":
        elements.push(
          img({ src: token.href, alt: token.text })`${token.title || ""}`
        );
        break;

      case "code":
        elements.push(
          <contentComponents.pre>
            <contentComponents.code className={`language-${token.lang}`}>
              {token.text}
            </contentComponents.code>
          </contentComponents.pre>
        );
        break;

      default:
        if ("text" in token) {
          elements.push(p()`${token.text}`);
        }
    }
  }

  return <div>{elements}</div>;
}

export function parseMarkdown(content: string): ParsedMarkdown {
  const tokens = marked.lexer(content);
  const headings: Heading[] = [];

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

  // Создаем Template из токенов
  const parsedContent = createTemplate(tokens);

  return {
    content: parsedContent,
    headings,
  };
}
