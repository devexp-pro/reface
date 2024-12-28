export interface Token {
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

export function tokenize(code: string): Token[] {
  let currentPosition = 0;
  const processedCode = code.replace(/^([ ]{2,})/gm, (match) => {
    const tabCount = Math.floor(match.length / 2);
    return "→\u200B".repeat(tabCount);
  });

  // Регулярные выражения для различных типов токенов
  const patterns = {
    keywords:
      /\b(const|let|var|function|return|if|else|for|while|do|class|extends|import|export|default|from|async|await|try|catch|throw|new|this|super)\b/,
    builtins:
      /\b(console|Object|Array|String|Number|Boolean|RegExp|Math|Date|Promise|Map|Set|Symbol)\b/,
    types: /\b(string|number|boolean|any|void|null|undefined)\b/,
    // Добавляем паттерны для HTML/JSX
    htmlTags:
      /\b(div|span|p|a|button|pre|script|style|input|form|label|img|svg|path)\b/,
    htmlAttributes:
      /\b(class|style|href|src|type|id|name|value|onClick|onChange|target|viewBox|fill|stroke|xmlns|width|height|fill-rule|clip-rule)\b/,
    jsxBraces: /[<>\/]/,
    // Добавляем паттерн для компонентов (начинаются с заглавной буквы)
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
      // Добавляем проверку для JSX скобок
      if (patterns.jsxBraces.test(token)) {
        return {
          type: "jsx-brace",
          value: token,
          color: "#94a3b8", // Тот же цвет, что и для пунктуации
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
      // Добавляем проверку для HTML тегов
      if (patterns.htmlTags.test(token)) {
        return {
          type: "html-tag",
          value: token,
          color: "#f472b6", // Розовый для HTML тегов
          posStart,
          posEnd,
        };
      }
      // Добавляем проверку для HTML атрибутов
      if (patterns.htmlAttributes.test(token)) {
        return {
          type: "html-attribute",
          value: token,
          color: "#a78bfa", // Светло-фиолетовый для атрибутов
          posStart,
          posEnd,
        };
      }
      // Добавляем проверку для компонентов (перед проверкой обычных слов)
      if (patterns.components.test(token)) {
        return {
          type: "component",
          value: token,
          color: "#fb923c", // Оранжевый для компонентов
          posStart,
          posEnd,
        };
      }
      // Для остальных слов (переменных, функций и т.д.)
      return {
        type: "word",
        value: token,
        color: "#e2e8f0",
        posStart,
        posEnd,
      };
    });
}
