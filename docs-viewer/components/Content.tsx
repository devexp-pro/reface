import { styled } from "@reface/elements";

const headingStyles = `
  color: #0f172a;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 2.5rem 0 1rem;
  line-height: var(--leading-tight);
`;

const H1 = styled.h1`
  & {
    ${headingStyles}
    font-size: var(--text-4xl);
    margin-top: 0;
  }
`;

const H2 = styled.h2`
  & {
    ${headingStyles}
    font-size: var(--text-3xl);
  }
`;

const H3 = styled.h3`
  & {
    ${headingStyles}
    font-size: var(--text-2xl);
  }
`;

const H4 = styled.h4`
  & {
    ${headingStyles}
    font-size: var(--text-xl);
  }
`;

const H5 = styled.h5`
  & {
    ${headingStyles}
    font-size: var(--text-lg);
  }
`;

const H6 = styled.h6`
  & {
    ${headingStyles}
    font-size: var(--text-base);
  }
`;

const Paragraph = styled.p`
  & {
    margin: 1.25rem 0;
    line-height: 1.75;
  }
`;

const Strong = styled.strong`
  & {
    font-weight: 600;
  }
`;

const Emphasis = styled.em`
  & {
    font-style: italic;
  }
`;

const Code = styled.code`
  & {
    font-family: monospace;
    background: #f1f5f9;
    padding: 0.2em 0.4em;
    border-radius: 0.25em;
  }
`;

const Link = styled.a`
  & {
    color: #2563eb;
    text-decoration: underline;
  }
  &:hover {
    color: #1d4ed8;
  }
`;

const Image = styled.img`
  & {
    max-width: 100%;
    height: auto;
  }
`;

const UnorderedList = styled.ul`
  & {
    list-style-type: disc;
    padding-left: 1.5em;
    margin: 1.25rem 0;
  }
`;

const OrderedList = styled.ol`
  & {
    list-style-type: decimal;
    padding-left: 1.5em;
    margin: 1.25rem 0;
  }
`;

const ListItem = styled.li`
  & {
    margin: 0.5em 0;
  }
`;

const Blockquote = styled.blockquote`
  & {
    border-left: 4px solid #e2e8f0;
    padding-left: 1em;
    margin: 1.25rem 0;
  }
`;

const Pre = styled.pre`
  & {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.25rem 0;
  }
`;

const Hr = styled.hr`
  & {
    border: 0;
    border-top: 1px solid #e2e8f0;
    margin: 2rem 0;
  }
`;

const Table = styled.table`
  & {
    width: 100%;
    border-collapse: collapse;
    margin: 1.25rem 0;
  }
`;

const TableHead = styled.thead`
  & {
    background: #f8fafc;
  }
`;

const TableCell = styled.td`
  & {
    padding: 0.75rem;
    border-bottom: 1px solid #e2e8f0;
  }
`;

const TableHeaderCell = styled.th`
  & {
    padding: 0.75rem;
    border-bottom: 1px solid #e2e8f0;
    text-align: left;
  }
`;

export const contentComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  strong: Strong,
  em: Emphasis,
  code: Code,
  a: Link,
  img: Image,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  pre: Pre,
  hr: Hr,
  table: Table,
  thead: TableHead,
  tbody: styled.tbody``,
  tr: styled.tr``,
  th: TableHeaderCell,
  td: TableCell,
  div: styled.div``,
  input: styled.input``,
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