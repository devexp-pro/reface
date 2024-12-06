import { styled } from "../../../source/mod.ts";

export const Content = styled.main`
  & {
    flex: 1;
    max-width: 48rem;
    margin: 0 auto;
  }

  & h1, & h2, & h3 {
    color: #0f172a;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin: 2.5rem 0 1rem;
  }

  & h1 {
    font-size: 2.25rem;
    margin-top: 0;
  }

  & h2 {
    font-size: 1.875rem;
  }

  & h3 {
    font-size: 1.5rem;
  }

  & p {
    line-height: 1.75;
    color: #334155;
    margin: 1.25rem 0;
  }

  & code {
    background: #f1f5f9;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
    color: #0f172a;
    font-family: ui-monospace, monospace;
  }

  & pre {
    background: #0f172a;
    color: #e2e8f0;
    padding: 1.25rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  & pre code {
    background: none;
    color: inherit;
    padding: 0;
    font-size: 0.875rem;
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
    font-size: 0.875rem;
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

  & a {
    display: block;
    color: #64748b;
    text-decoration: none;
    font-size: 0.875rem;
    line-height: 1.25;
    transition: color 0.2s;
  }

  & a:hover {
    color: #0f172a;
  }

  @media (max-width: 1280px) {
    & {
      display: none;
    }
  }
`; 