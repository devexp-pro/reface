import { createElement, Fragment } from "../../../source/mod.ts";

import { styled } from "../../../source/mod.ts";

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
    background: #0f172a;
    color: #e2e8f0;
    padding: 1.25rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
  }

  & ${ContentCode} {
    background: none;
    color: inherit;
    padding: 0;
  }
`;

export const Content = styled.main`
  & {
    flex: 1;
    max-width: 48rem;
    margin: 0 auto;
    font-family: var(--font-sans);
  }
`;

export const DocContent = styled.div`
  & {
    margin-bottom: 4rem;
  }

  & img {
    max-width: 100%;
    border-radius: 0.5rem;
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
    position: fixed;
    top: 5rem;
    right: 2rem;
    width: 16rem;
    max-height: calc(100vh - 7rem);
    overflow-y: auto;
    padding: 1rem;
  }

  & h4 {
    font-size: var(--text-sm);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
    margin: 0 0 0.75rem;
  }

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  & li {
    margin: 0.25rem 0;
  }

  & ${ContentA} {
    display: block;
    font-size: var(--text-sm);
    line-height: var(--leading-normal);
    color: #64748b;

    &:hover {
      color: #0f172a;
      text-decoration: none;
    }

    &:focus {
      color: #0f172a;
      outline: 2px solid #94a3b8;
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  @media (max-width: 1280px) {
    & {
      display: none;
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