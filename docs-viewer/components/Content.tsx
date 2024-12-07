import { createElement, Fragment } from "@reface/jsx";
import { styled } from "@reface/elements";

// Базовые стили для заголовков
const headingStyles = `
  color: #0f172a;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 2.5rem 0 1rem;
  line-height: var(--leading-tight);
`;

const ContentH1 = styled.h1`
  & {
    ${headingStyles}
    font-size: var(--text-4xl);
    margin-top: 0;
    background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ContentH2 = styled.h2`
  & {
    ${headingStyles}
    font-size: var(--text-3xl);
  }
`;

const ContentH3 = styled.h3`
  & {
    ${headingStyles}
    font-size: var(--text-2xl);
  }
`;

const ContentParagraph = styled.p`
  & {
    font-size: var(--text-base);
    line-height: var(--leading-relaxed);
    color: #334155;
    margin: 1.25rem 0;
  }
`;

const ContentCode = styled.code`
  & {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    background: #f1f5f9;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    color: #0f172a;
  }
`;

const ContentPre = styled.pre`
  & {
    background: #1e293b;
    color: #e2e8f0;
    padding: 1.5rem;
    border-radius: 0.75rem;
    overflow-x: auto;
    margin: 1.5rem 0;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }

  & ${ContentCode} {
    background: none;
    color: inherit;
    padding: 0;
  }

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

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

  @media (max-width: 1024px) {
    & {
      max-width: none;
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    & {
      padding: 1.5rem;
    }
  }
`;

export const DocContent = styled.div`
  & {
    margin-bottom: 4rem;
  }

  & img {
    max-width: 100%;
    border-radius: 0.5rem;
    border: 1px solid rgba(226, 232, 240, 0.8);
  }
`;


const ContentOl = styled.ol`
  & {
    list-style-type: decimal;
    padding-left: 1.5rem;
    margin: 1rem 0;
  }
`;

const ContentUl = styled.ul`
  & {
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 1rem 0;
  }
`;

const ContentLi = styled.li`
  & {
    margin: 0.5rem 0;
    line-height: var(--leading-relaxed);
  }

  & input[type="checkbox"] {
    margin-right: 0.5rem;
  }
`;

const ContentBlockquote = styled.blockquote`
  & {
    border-left: 4px solid #e2e8f0;
    padding-left: 1rem;
    margin: 1.5rem 0;
    color: #64748b;
  }
`;

const ContentHr = styled.hr`
  & {
    border: none;
    border-top: 1px solid #e2e8f0;
    margin: 2rem 0;
  }
`;

const ContentTable = styled.table`
  & {
    width: 100%;
    margin: 1.5rem 0;
    border-collapse: collapse;
  }

  & th,
  & td {
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    text-align: left;
  }

  & th {
    background: #f8fafc;
    font-weight: 600;
  }
`;

const ContentStrong = styled.strong`
  & {
    font-weight: 600;
  }
`;

const ContentEm = styled.em`
  & {
    font-style: italic;
  }
`;

const ContentA = styled.a`
  & {
    color: #2563eb;
    text-decoration: none;
    transition: color 0.2s;
  }

  &:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }

  &:focus {
    outline: 2px solid #60a5fa;
    outline-offset: 2px;
    border-radius: 2px;
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

  & li {
    margin: 0.25rem 0;
  }

  & a {
    display: block;
    padding: 0.375rem 0.75rem;
    color: #64748b;
    text-decoration: none;
    font-size: var(--text-sm);
    border-radius: 0.375rem;
    transition: all 0.15s;
  }

  & a:hover {
    color: #1e293b;
    background: rgba(226, 232, 240, 0.5);
  }

  @media (max-width: 1024px) {
    & {
      width: 100%;
      position: relative;
      top: 0;
    }
  }

  @media (max-width: 768px) {
    & {
      padding: 1rem;
    }
  }
`;

const ContentImg = styled.img`
  & {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
  }

  &[title] {
    margin-bottom: 0.5rem;
  }

  &[title]::after {
    content: attr(title);
    display: block;
    text-align: center;
    font-size: var(--text-sm);
    color: #64748b;
    margin-top: 0.5rem;
  }
`;

// Экспортируем компоненты для использования в markdown
export const contentComponents = {
  h1: ContentH1,
  h2: ContentH2,
  h3: ContentH3,
  p: ContentParagraph,
  code: ContentCode,
  pre: ContentPre,
  ol: ContentOl,
  ul: ContentUl,
  li: ContentLi,
  blockquote: ContentBlockquote,
  hr: ContentHr,
  table: ContentTable,
  strong: ContentStrong,
  em: ContentEm,
  a: ContentA,
  img: ContentImg,
}; 