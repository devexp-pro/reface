import type { Template } from "@reface/types";
import { marked } from "https://esm.sh/marked@9.1.5";
import { contentComponents as c } from "../components/MarkdownComponents.tsx";
import { Code } from "../components/Code.tsx";

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
function processInlineContent(tokens: marked.Token[] | string): Template {
  if (typeof tokens === "string") {
    return <>{tokens}</>;
  }

  return (
    <>
      {tokens.map(token => {
        switch (token.type) {
          case "strong":
            return (
              <c.strong>
                {processInlineContent(token.tokens || [token.text])}
              </c.strong>
            );

          case "em":
            return (
              <c.em>
                {processInlineContent(token.tokens || [token.text])}
              </c.em>
            );

          case "link":
            return (
              <c.a href={token.href}>
                {processInlineContent(token.tokens || [token.text])}
              </c.a>
            );

          case "image":
            return (
              <c.img
                src={token.href}
                alt={token.text}
                title={token.title}
              />
            );

          case "codespan":
            return <c.code>{token.text}</c.code>;

          case "text":
          default:
            return token.text;
        }
      })}
    </>
  );
}

function processListItems(items: marked.Token.ListItem[]): Template {
  return (
    <>
      {items.map(item => {
        const content = processInlineContent(item.tokens || [item.text]);
        return (
          <c.li>
            {item.task && (
              <c.input
                type="checkbox"
                checked={item.checked}
                disabled
              />
            )}
            {content}
            {item.items && (
              <c.ul>
                {processListItems(item.items)}
              </c.ul>
            )}
          </c.li>
        );
      })}
    </>
  );
}

// Обработка отдельного токена
function processToken(token: marked.Token): Template {
  switch (token.type) {
    case "heading": {
      const Component = c[`h${token.depth}`];
      return (
        <Component>
          {processInlineContent(token.tokens || [token.text])}
        </Component>
      );
    }

    case "paragraph":
      return (
        <c.p>
          {processInlineContent(token.tokens || [token.text])}
        </c.p>
      );

    case "code":
      return (
        <Code 
          content={token.text}
          language={token.lang || "text"}
        />
      );

    case "blockquote":
      return (
        <c.blockquote>
          {token.tokens.map(processToken)}
        </c.blockquote>
      );

    case "list": {
      const Component = token.ordered ? c.ol : c.ul;
      return <Component>{processListItems(token.items)}</Component>;
    }

    case "hr":
      return <c.hr />;

    case "table":
      return (
        <c.table>
          <thead>
            <tr>
              {token.header.map(cell => (
                <th>
                  {processInlineContent(cell.tokens || [cell.text])}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {token.rows.map(row => (
              <tr>
                {row.map(cell => (
                  <td>
                    {processInlineContent(cell.tokens || [cell.text])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </c.table>
      );

    default:
      if ("text" in token) {
        return <c.p>{token.text}</c.p>;
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

  return {
    content: <c.div>{tokens.map(processToken)}</c.div>,
    headings,
  };
}
