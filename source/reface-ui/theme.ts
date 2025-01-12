const toCSSVar = (path: string) =>
  `var(--${
    path.replace(/\./g, "-").replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
  })`;
const toCSSVarName = (path: string) =>
  `--${
    path.replace(/\./g, "-").replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
  }`;

export const BASE_SIZE = 2;

const roundToBase = (value: number) =>
  Math.round(value / BASE_SIZE) * BASE_SIZE;

const opacity = (hex: string, alpha: number): string => {
  const cleanHex = hex.replace("#", "");

  const alphaHex = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");

  return `#${cleanHex}${alphaHex}`;
};

const sizeUtils = {
  linear: (n: number) => `${roundToBase(n * BASE_SIZE)}px`,

  square: (n: number) => `${roundToBase(Math.pow(n, 2) * BASE_SIZE)}px`,

  golden: (n: number) => `${roundToBase(Math.pow(1.618, n) * BASE_SIZE)}px`,

  log: (n: number) => `${roundToBase(Math.log2(n + 1) * BASE_SIZE)}px`,

  fibonacci: (n: number) => {
    const fib = (n: number): number => n <= 1 ? n : fib(n - 1) + fib(n - 2);
    return `${roundToBase(fib(n) * BASE_SIZE)}px`;
  },
};

// Base theme configuration
const themeConfig = {
  colors: {
    bg: {
      base: "#2c2c2c",
      panel: "#1c1c1c",
      panelLight: "#2c2c2c",
      panelDark: "#161616",
      input: "#3c3c3c",
      hover: "#4c4c4c",
    },
    surface: {
      base: "var(--bg-panel)",
      light: "var(--bg-panel-light)",
      dark: "var(--bg-panel-dark)",
    },
    text: {
      base: "#ebebeb",
      dimmed: "#9ca3af",
      label: "#d1d5db",
    },
    border: {
      base: "#404040",
      hover: "#525252",
      light: opacity("#FFFFFF", 0.1),
      dark: opacity("#000000", 0.2),
    },
    accent: {
      base: "#60a5fa",
      hover: "#3b82f6",
    },
    primary: {
      base: "#ec4899", // Pink
      hover: "#db2777",
    },
    secondary: {
      base: "#8b5cf6", // Purple
      hover: "#7c3aed",
    },
    success: {
      base: "#4ade80",
      hover: "#22c55e",
    },
    info: {
      base: "#38bdf8",
      hover: "#0ea5e9",
    },
    warning: {
      base: "#eab308", // Yellow
      hover: "#ca8a04",
    },
    error: {
      base: "#ef4444", // Red
      hover: "#dc2626",
    },
  },
  spacing: {
    xs: sizeUtils.linear(1), // 2px
    sm: sizeUtils.linear(2), // 4px
    md: sizeUtils.linear(3), // 6px
    lg: sizeUtils.linear(4), // 8px
    xl: sizeUtils.linear(5), // 10px
  },
  sizes: {
    xs: sizeUtils.golden(2), // ≈ 5px
    sm: sizeUtils.golden(3), // ≈ 8px
    md: sizeUtils.golden(4), // ≈ 13px
    lg: sizeUtils.golden(5), // ≈ 21px
    xl: sizeUtils.golden(6), // ≈ 34px
  },
  typography: {
    fonts: {
      mono: "'JetBrains Mono', monospace",
      ui: "Inter, system-ui, -apple-system, sans-serif",
    },
    sizes: {
      xs: sizeUtils.linear(5.5), // 11px
      sm: sizeUtils.linear(6), // 12px
      md: sizeUtils.linear(6.5), // 13px
      lg: sizeUtils.linear(7), // 14px
    },
    weights: {
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },
  containers: {
    xs: sizeUtils.log(4),
    sm: sizeUtils.log(8),
    md: sizeUtils.log(16),
    lg: sizeUtils.log(32),
  },
};

const generateThemeAndVars = (
  obj: any,
  path: string[] = [],
): [string[], any] => {
  const vars: string[] = [];
  const theme: any = {};

  for (const [key, value] of Object.entries(obj)) {
    const newPath = [...path, key];
    const cssPath = newPath.join("-");

    if (typeof value === "object") {
      const [childVars, childTheme] = generateThemeAndVars(value, newPath);
      vars.push(...childVars);
      theme[key] = childTheme;
    } else {
      vars.push(`${toCSSVarName(cssPath)}: ${value};`);
      theme[key] = toCSSVar(cssPath);
    }
  }

  return [vars, theme];
};

const [cssVars, themeVars] = generateThemeAndVars(themeConfig);

const baseStyles = `
  /* Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* Root */
  :root {
    color-scheme: light dark;
  }

  /* Body */
  body {
    font-family: ${themeVars.typography.fonts.ui};
    font-size: ${themeVars.typography.sizes.sm};
    line-height: 1.5;
    color: ${themeVars.colors.text.base};
    background: ${themeVars.colors.bg.base};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    color: ${themeVars.colors.text.label};
    font-weight: ${themeVars.typography.weights.semibold};
    line-height: 1.2;
  }

  p {
    color: ${themeVars.colors.text.base};
    margin-bottom: ${themeVars.spacing.md};
  }

  a {
    color: ${themeVars.colors.accent.base};
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  code {
    font-family: ${themeVars.typography.fonts.mono};
    font-size: 0.9em;
    color: ${themeVars.colors.text.base};
    background: ${themeVars.colors.bg.input};
    padding: 0.2em 0.4em;
    border-radius: 4px;
  }

  /* Focus */
  :focus-visible {
    outline: 2px solid ${themeVars.colors.accent.base};
    outline-offset: 2px;
  }

  /* Selection */
  ::selection {
    background: ${themeVars.colors.accent.base};
    color: #ffffff;
  }
`;

export const globalStyles = `
:root {
  ${cssVars.join("\n  ")}
}

${baseStyles}
`;

export const theme = {
  ...themeVars,
  sizeUtils,
};
