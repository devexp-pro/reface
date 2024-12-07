import { createElement } from "@reface/jsx";
import { div, h1, h2, h3, p, code, pre, ol, ul, li, blockquote, hr, table, strong, em, a, img, input } from "@reface/elements";
import type { Template } from "@reface/types";

// Базовые стили для заголовков
const headingStyles = `
  color: #0f172a;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 2.5rem 0 1rem;
  line-height: var(--leading-tight);
`;

// Создаем компоненты напрямую
export const contentComponents = {
  h1: ({ children }: { children?: unknown }): Template => (
    <h1 style={`
      ${headingStyles}
      font-size: var(--text-4xl);
      margin-top: 0;
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    `}>
      {children}
    </h1>
  ),

  h2: ({ children }: { children?: unknown }): Template => (
    <h2 style={`
      ${headingStyles}
      font-size: var(--text-3xl);
    `}>
      {children}
    </h2>
  ),

  p: ({ children }: { children?: unknown }): Template => (
    <p style={`
      font-size: var(--text-base);
      line-height: var(--leading-relaxed);
      color: #334155;
      margin: 1.25rem 0;
    `}>
      {children}
    </p>
  ),

  // ... и так далее для каждого компонента
};

export const Content = styled.main`
  & {
    flex: 1;
    min-width: 0;
    max-width: 48rem;
    padding: 2rem;
    background: white;
    border-radius: 0.75rem;
    border: 1px solid rgba(226, 232, 240, 0.8);
  }
`;

export const DocContent = styled.div`
  & {
    margin-bottom: 4rem;
  }
`;

export const TableOfContents = styled.nav`
  & {
    width: 16rem;
    padding: 1.5rem;
    background: white;
    border-radius: 0.75rem;
    border: 1px solid rgba(226, 232, 240, 0.8);
    height: fit-content;
    position: sticky;
    top: 5rem;
    flex-shrink: 0;
  }

  & h4 {
    font-size: var(--text-sm);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
    margin: 0 0 1rem;
  }

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`; 