import { createElement, Fragment } from "@reface/jsx";
import type { Template } from "@reface/types";
import { marked } from "https://esm.sh/marked@9.1.5";
import { contentComponents } from "../components/MarkdownComponents.tsx";

interface Heading {
  level: number;
  text: string;
  slug: string;
}

export interface ParsedMarkdown {
  content: Template;
  headings: Heading[];
}

// Обработка встроенных элементов
function processInlineContent(tokens: marked.Token[] | string): Template[] {
  if (typeof tokens === "string") {
    return [tokens];
  }

  return tokens.map(token => {
    switch (token.type) {
      case "strong": {
        const content = processInlineContent(token.tokens || [token.text]);
        return <contentComponents.strong>{content}</contentComponents.strong>;
      }

      case "em": {
        const content = processInlineContent(token.tokens || [token.text]);
        return <contentComponents.em>{content}</contentComponents.em>;
      }

      case "link": {
        const content = processInlineContent(token.tokens || [token.text]);
        return <contentComponents.a href={token.href}>{content}</contentComponents.a>;
      }

      case "image":
        return <contentComponents.img 
          src={token.href} 
          alt={token.text}
          title={token.title}
        />;

      case "codespan":
        return <contentComponents.code>{token.text}</contentComponents.code>;

      case "text":
      default:
        return token.text;
    }
  });
}

function processListItems(items: marked.Token.ListItem[]): Template[] {
  return items.map(item => {
    const content = processInlineContent(item.tokens || [item.text]);
    const checkbox = item.task && (
      <input 
        type="checkbox" 
        checked={item.checked}
        disabled
      />
    );

    // Рекурсивно обрабатываем вложенные списки
    const nestedList = item.items && (
      <contentComponents.ul>
        {processListItems(item.items)}
      </contentComponents.ul>
    );

    return (
      <contentComponents.li>
        {checkbox}
        {content}
        {nestedList}
      </contentComponents.li>
    );
  });
}

// Обработка отдельного токена
function processToken(token: marked.Token): Template {
  switch (token.type) {
    case "paragraph":
      return <contentComponents.p>
        {processInlineContent(token.tokens || [token.text])}
      </contentComponents.p>;

    case "heading": {
      const HeadingComponent = [
        contentComponents.h1,
        contentComponents.h2,
        contentComponents.h3
      ][token.depth - 1] || contentComponents.h3;
      
      const slug = token.text.toLowerCase().replace(/[^\w]+/g, "-");
      const content = processInlineContent(token.tokens || [token.text]);
      
      return <HeadingComponent id={slug}>{content}</HeadingComponent>;
    }

    case "list": {
      const ListComponent = token.ordered ? contentComponents.ol : contentComponents.ul;
      return (
        <ListComponent>
          {processListItems(token.items)}
        </ListComponent>
      );
    }

    case "code":
      return <contentComponents.pre>
        <contentComponents.code className={`language-${token.lang || ''}`}>
          {token.text}
        </contentComponents.code>
      </contentComponents.pre>;

    case "blockquote":
      return <contentComponents.blockquote>
        {processMarkdownContent(token.text)}
      </contentComponents.blockquote>;

    case "hr":
      return <contentComponents.hr />;

    case "table":
      return <contentComponents.table>
        <thead>
          <tr>
            {token.header.map(cell => (
              <th>{processInlineContent(cell.tokens || [cell.text])}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {token.rows.map(row => (
            <tr>
              {row.map(cell => (
                <td>{processInlineContent(cell.tokens || [cell.text])}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </contentComponents.table>;

    default:
      if ("text" in token) {
        return <contentComponents.p>{token.text}</contentComponents.p>;
      }
      return <></>;
  }
}

// Рекурсивная функция для обработки вложенного markdown
function processMarkdownContent(content: string): Template[] {
  const tokens = marked.lexer(content);
  return tokens.map(processToken);
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
  const elements = tokens.map(processToken);

  return {
    content: <div>{elements}</div>,
    headings,
  };
}
