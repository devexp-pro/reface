export const theme = {
  // Цвета
  colors: {
    text: {
      primary: "var(--color-text)",
      secondary: "var(--color-text-light)",
      link: "var(--color-primary)",
      code: "#1a1b1d",
    },
    background: {
      primary: "white",
      secondary: "var(--color-background)",
      code: "#f8fafc",
    },
    border: "var(--color-border)",
  },

  // Типографика
  typography: {
    fonts: {
      base: "var(--font-sans)",
      mono: "var(--font-mono)",
    },
    sizes: {
      base: "var(--text-base)",
      sm: "var(--text-sm)",
      lg: "var(--text-lg)",
      xl: "var(--text-xl)",
      "2xl": "var(--text-2xl)",
      "3xl": "var(--text-3xl)",
      "4xl": "var(--text-4xl)",
    },
    lineHeight: {
      tight: "var(--leading-tight)",
      normal: "var(--leading-normal)",
      relaxed: "var(--leading-relaxed)",
    },
    tracking: {
      tight: "var(--tracking-tight)",
      normal: "var(--tracking-normal)",
      wide: "var(--tracking-wide)",
    },
  },

  // Отступы
  spacing: {
    0: "0",
    1: "0.25rem",
    2: "0.5rem",
    3: "0.75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    8: "2rem",
    10: "2.5rem",
    12: "3rem",
  },

  // Границы
  borders: {
    default: "1px solid var(--color-border)",
    radius: {
      sm: "0.25rem",
      md: "0.5rem",
      lg: "0.75rem",
    },
  },

  // Медиа-запросы
  breakpoints: {
    sm: "@media (min-width: 640px)",
    md: "@media (min-width: 768px)",
    lg: "@media (min-width: 1024px)",
    xl: "@media (min-width: 1280px)",
  },
} as const;
