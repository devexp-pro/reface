import { styled } from "@reface/plugins/styled";


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

const ContentPre = styled.div`
  & {
    margin: 1.5rem 0;
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
`;

const ContentImg = styled.img`
  & {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
  }
`;

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