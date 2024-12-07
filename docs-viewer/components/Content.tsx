import { styled } from "@reface/elements";

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