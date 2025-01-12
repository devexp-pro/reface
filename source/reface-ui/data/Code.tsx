import { component, styled } from "@recast";
import { span } from "@recast/element";

interface Token {
  type:
    | "tab"
    | "number"
    | "string"
    | "whitespace"
    | "punctuation"
    | "word"
    | "keyword"
    | "builtin"
    | "type"
    | "html-tag"
    | "html-attribute"
    | "jsx-brace"
    | "component";
  value: string;
  color?: string;
  posStart: number;
  posEnd: number;
}

function tokenize(code: string): Token[] {
  let currentPosition = 0;
  const processedCode = code.replace(/^([ ]{2,})/gm, (match) => {
    const tabCount = Math.floor(match.length / 2);
    return "→\u200B".repeat(tabCount);
  });

  const patterns = {
    keywords:
      /\b(const|let|var|function|return|if|else|for|while|do|class|extends|import|export|default|from|async|await|try|catch|throw|new|this|super)\b/,
    builtins:
      /\b(console|Object|Array|String|Number|Boolean|RegExp|Math|Date|Promise|Map|Set|Symbol)\b/,
    types: /\b(string|number|boolean|any|void|null|undefined)\b/,
    htmlTags:
      /\b(div|span|p|a|button|pre|script|style|input|form|label|img|svg|path)\b/,
    htmlAttributes:
      /\b(class|style|href|src|type|id|name|value|onClick|onChange|target|viewBox|fill|stroke|xmlns|width|height|fill-rule|clip-rule)\b/,
    jsxBraces: /[<>\/]/,
    components: /\b[A-Z][a-zA-Z]*\b/,
  };

  return processedCode
    .split(
      /(\s+|[.,{}[\]()=:]+|"[^"]*"|'[^']*'|\d+|\b\w+\b|→|[│─┌┐└┘▶▼]|[<>\/])/g,
    )
    .filter(Boolean)
    .map((token) => {
      const posStart = currentPosition;
      const posEnd = currentPosition + token.length;
      currentPosition = posEnd;

      if (token === "→") {
        return {
          type: "tab",
          value: "  ",
          color: "rgba(255, 255, 255, 0.1)",
          posStart,
          posEnd,
        };
      }
      if (/^[│─┌┐└┘▶▼]$/.test(token)) {
        return {
          type: "punctuation",
          value: token,
          color: "#64748b",
          posStart,
          posEnd,
        };
      }
      if (/^\d+$/.test(token)) {
        return {
          type: "number",
          value: token,
          color: "#f59e0b",
          posStart,
          posEnd,
        };
      }
      if (/^["'].*["']$/.test(token)) {
        return {
          type: "string",
          value: token,
          color: "#22c55e",
          posStart,
          posEnd,
        };
      }
      if (/^\s+$/.test(token)) {
        return { type: "whitespace", value: token, posStart, posEnd };
      }
      if (/^[.,{}[\]()=:]+$/.test(token)) {
        return {
          type: "punctuation",
          value: token,
          color: "#94a3b8",
          posStart,
          posEnd,
        };
      }
      if (patterns.jsxBraces.test(token)) {
        return {
          type: "jsx-brace",
          value: token,
          color: "#94a3b8",
          posStart,
          posEnd,
        };
      }
      if (patterns.keywords.test(token)) {
        return {
          type: "keyword",
          value: token,
          color: "#60a5fa",
          posStart,
          posEnd,
        };
      }
      if (patterns.builtins.test(token)) {
        return {
          type: "builtin",
          value: token,
          color: "#c084fc",
          posStart,
          posEnd,
        };
      }
      if (patterns.types.test(token)) {
        return {
          type: "type",
          value: token,
          color: "#2dd4bf",
          posStart,
          posEnd,
        };
      }
      if (patterns.htmlTags.test(token)) {
        return {
          type: "html-tag",
          value: token,
          color: "#f472b6",
          posStart,
          posEnd,
        };
      }
      if (patterns.htmlAttributes.test(token)) {
        return {
          type: "html-attribute",
          value: token,
          color: "#a78bfa",
          posStart,
          posEnd,
        };
      }
      if (patterns.components.test(token)) {
        return {
          type: "component",
          value: token,
          color: "#fb923c",
          posStart,
          posEnd,
        };
      }
      return {
        type: "word",
        value: token,
        color: "#e2e8f0",
        posStart,
        posEnd,
      };
    });
}

const StyledCode = styled.div /*css*/`
  & {
    background: #1e293b;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  & .code-block {
    margin: 0;
    padding: 1rem 0;
    font-size: 0.875rem;
    line-height: 1.5;
    font-family: ui-monospace, monospace;
    overflow-x: auto;
    position: relative;
  }

  & .code-block.clip::before,
  & .code-block.clip::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 4rem;
    pointer-events: none;
    z-index: 1;
  }

  & .code-block.clip::before {
    top: 0;
    background: linear-gradient(to bottom, #1e293b 0%, transparent 100%);
  }

  & .code-block.clip::after {
    bottom: 0;
    background: linear-gradient(to top, #1e293b 0%, transparent 100%);
  }

  & .code-line {
    display: flex;
    padding: 0 1rem;
    white-space: pre;
  }

  & .error-line {
    background: rgba(239, 68, 68, 0.1);
    position: relative;
  }

  & .error-line::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: #ef4444;
  }

  & .line-number {
    color: #64748b;
    padding-right: 1rem;
    text-align: right;
    user-select: none;
    min-width: 3rem;
  }

  & .line-content {
    color: #e2e8f0;
    padding-left: 1rem;
  }

  & .error-message-inline {
    padding: 0.25rem 0 0.5rem 0;
    color: #ef4444;
    font-family: ui-monospace, monospace;
    font-size: 0.875rem;
    white-space: pre;
    position: relative;
  }

  & .error-char {
    text-decoration: wavy underline #ef4444;
    text-underline-offset: 4px;
  }
`;

type CodeProps = {
  startLineNumber?: number;
  code?: string;
  error?: {
    line: number;
    char: number;
    message: string;
  };
  clip?: boolean;
};

export const Code = component(
  ({ code = "", startLineNumber, error, clip }: CodeProps) => {
    const lines = code.split("\n");
    const startLine = startLineNumber || 1;

    return (
      <StyledCode>
        <div class={`code-block${clip ? " clip" : ""}`}>
          {lines.map((line, i) => {
            const lineNum = startLine + i;
            const isErrorLine = error?.line === lineNum;

            if (isErrorLine) {
              return (
                <>
                  <div class="code-line error-line">
                    <span class="line-number">{lineNum}</span>
                    <span class="line-content">
                      {tokenize(line).map((token) => {
                        if (
                          token.posStart < error.char &&
                          token.posEnd >= error.char
                        ) {
                          return span({ class: "error-char" })`${token.value}`;
                        }
                        return span({
                          style: { color: token.color },
                        })`${token.value}`;
                      })}
                    </span>
                  </div>
                  <div class="code-line error-message-inline error-line">
                    <span class="line-number"></span>
                    {" ".repeat(Math.floor(error.char + 3))}└─▶ {error.message}
                  </div>
                </>
              );
            }

            return (
              <div class="code-line">
                <span class="line-number">{lineNum}</span>
                <span class="line-content">
                  {tokenize(line).map((token) =>
                    span({ style: { color: token.color } })`${token.value}`
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </StyledCode>
    );
  },
);
