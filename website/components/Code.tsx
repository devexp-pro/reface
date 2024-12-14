import { styled } from "@reface/plugins/styled";

// Утилиты для токенизации
function hashColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 65%)`;
}

interface Token {
  type: "tab" | "number" | "string" | "whitespace" | "punctuation" | "word";
  value: string;
  color?: string;
}

function tokenize(code: string): Token[] {
  // Обрабатываем только строки, начинающиеся с пробелов
  const processedCode = code.replace(/^([ ]{2,})/gm, (match) => {
    const tabCount = Math.floor(match.length / 2);
    return "→\u200B".repeat(tabCount);
  });

  return processedCode
    .split(/(\s+|[.,{}[\]()=:]+|"[^"]*"|'[^']*'|\d+|\w+|→|[│─┌┐└┘▶▼])/g)
    .filter(Boolean)
    .map((token) => {
      if (token === "→") {
        return {
          type: "tab",
          value: "  ",
          color: "rgba(37, 99, 235, 0.2)",
        };
      }
      if (/^[│─┌┐└┘▶▼]$/.test(token)) {
        return {
          type: "punctuation",
          value: token,
          color: "#4f46e5"
        };
      }
      if (/^\d+$/.test(token)) {
        const colors = [
          "#2563eb",
          "#7c3aed",
          "#6366f1",
          "#0891b2",
        ];
        return {
          type: "number",
          value: token,
          color: colors[Math.abs(parseInt(token)) % colors.length],
        };
      }
      if (/^["']/.test(token)) {
        return { 
          type: "string", 
          value: token, 
          color: "#0d9488"
        };
      }
      if (/^\s+$/.test(token)) {
        return { type: "whitespace", value: token };
      }
      if (/^[.,{}[\]()=:]+$/.test(token)) {
        return { 
          type: "punctuation", 
          value: token, 
          color: "#6b7280"
        };
      }
      const colors = [
        "#2563eb",
        "#4f46e5",
        "#0891b2",
        "#1e40af",
        "#3730a3",
        "#0e7490",
      ];
      return {
        type: "word",
        value: token,
        color: colors[Math.abs(hashString(token)) % colors.length],
      };
    });
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

// Стилизованные компоненты
const CodeContainer = styled.div`
  & {
    margin: 1.5rem 0;
    border-radius: 0.75rem;
    overflow: hidden;
    background: #f1f5f9;
    border: 1px solid var(--color-border);
    color: var(--color-text);
  }
`;

const Header = styled.div`
  & {
    display: flex;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background: #e2e8f0;
    gap: 0.75rem;
    font-size: 0.75rem;
    color: var(--color-text-light);
    border-bottom: 1px solid var(--color-border);
  }
`;

const FileLang = styled.span`
  & {
    color: var(--color-text-light);
    padding: 0.125rem 0.375rem;
    background: rgba(148, 163, 184, 0.2);
    border-radius: 0.25rem;
  }
`;

const Content = styled.div`
  & {
    padding: 1rem;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 6px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(226, 232, 240, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(100, 116, 139, 0.2);
      border-radius: 3px;
    }
  }
`;

const Pre = styled.pre`
  & {
    margin: 0;
    font-family: var(--font-mono);
    font-size: 0.875rem;
    line-height: 1.5;
    color: #e2e8f0;
  }
`;

const Line = styled.div`
  & {
    display: flex;
    white-space: pre;
    padding: 0 0.5rem;
  }

  &:hover {
    background: #e2e8f0;
  }
`;

const LineNumber = styled.span`
  & {
    color: var(--color-text-light);
    padding-right: 1.5rem;
    user-select: none;
    text-align: right;
    font-family: var(--font-mono);
    min-width: 2ch;
    opacity: 0.5;
    display: inline-block;
  }
`;

const Token = styled.span<TokenProps>`
  & {
    color: ${props => props.color || '#e2e8f0'};
  }
`;

interface CodeProps {
  content: string;
  language: string;
  filename?: string;
}

export function Code({ content, language, filename = `example.${language}` }: CodeProps) {
  const lines = content.split("\n");
  const totalLines = lines.length;
  const lineNumberWidth = totalLines.toString().length;

  return (
    <CodeContainer>
      <Header>
        {filename}
        <FileLang>{language}</FileLang>
      </Header>
      <Content>
        <Pre>
          {lines.map((line, i) => (
            <Line>
              <LineNumber style={`width: ${lineNumberWidth}ch`}>
                {(i + 1).toString().padStart(lineNumberWidth)}
              </LineNumber>
              {tokenize(line).map(token => (
                <Token style={`color: ${token.color}`}>{token.value}</Token>
              ))}
            </Line>
          ))}
        </Pre>
      </Content>
    </CodeContainer>
  );
} 