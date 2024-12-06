import { marked } from "https://esm.sh/marked@9.1.5";
import {
  div,
  p,
  h1,
  h2,
  h3,
  h4,
  ul,
  ol,
  li,
  a,
  img,
  createElement,
  type Template,
} from "../../../source/mod.ts";

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
        elements.push(p()`${token.text}`);
        break;

      case "heading":
        const slug = token.text.toLowerCase().replace(/[^\w]+/g, "-");
        const HeadingComponent = [h1, h2, h3, h4][token.depth - 1] || h4;
        elements.push(HeadingComponent({ id: slug })`${token.text}`);
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
        elements.push(div({ class: "code-block" })`
          <pre><code class="language-${token.lang}">${token.text}</code></pre>
        `);
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
