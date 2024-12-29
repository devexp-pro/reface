// Определяем базовые CSS переменные
const cssVariables = `
  :root {
    /* Colors */
    --bg-base: #2c2c2c;
    --bg-panel: #1c1c1c;
    --bg-input: #3c3c3c;
    --bg-hover: #4c4c4c;

    --text-base: #ebebeb;
    --text-dimmed: #9ca3af;
    --text-label: #d1d5db;

    --border-base: #404040;
    --border-hover: #525252;

    --accent-base: #60a5fa;
    --accent-hover: #3b82f6;

    /* Spacing */
    --space-xs: 0.25rem;
    --space-sm: 0.5rem;
    --space-md: 0.75rem;
    --space-lg: 1rem;

    /* Typography */
    --font-mono: 'JetBrains Mono', monospace;
    --font-ui: Inter, system-ui, -apple-system, sans-serif;

    --font-size-xs: 11px;
    --font-size-sm: 12px;
    --font-size-md: 13px;
    --font-size-lg: 14px;

    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
  }
`;

// Экспортируем тему с использованием CSS переменных
export const theme = {
  colors: {
    bg: {
      base: "var(--bg-base)",
      panel: "var(--bg-panel)",
      input: "var(--bg-input)",
      hover: "var(--bg-hover)",
    },
    text: {
      base: "var(--text-base)",
      dimmed: "var(--text-dimmed)",
      label: "var(--text-label)",
    },
    border: {
      base: "var(--border-base)",
      hover: "var(--border-hover)",
    },
    accent: {
      base: "var(--accent-base)",
      hover: "var(--accent-hover)",
    },
  },
  spacing: {
    xs: "var(--space-xs)",
    sm: "var(--space-sm)",
    md: "var(--space-md)",
    lg: "var(--space-lg)",
  },
  typography: {
    fonts: {
      mono: "var(--font-mono)",
      ui: "var(--font-ui)",
    },
    sizes: {
      xs: "var(--font-size-xs)",
      sm: "var(--font-size-sm)",
      md: "var(--font-size-md)",
      lg: "var(--font-size-lg)",
    },
    weights: {
      normal: "var(--font-weight-normal)",
      medium: "var(--font-weight-medium)",
      semibold: "var(--font-weight-semibold)",
    },
  },
  cssVariables, // Экспортируем CSS переменные для использования в глобальных стилях
};
