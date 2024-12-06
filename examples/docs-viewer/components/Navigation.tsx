import { styled } from "../../../source/mod.ts";

export const Navigation = styled.nav`
  & {
    width: 16rem;
    position: sticky;
    top: 5rem;
    height: calc(100vh - 5rem);
    overflow-y: auto;
    padding-right: 1rem;
  }

  & h3 {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
    margin: 2rem 0 0.5rem;
  }

  & h3:first-child {
    margin-top: 0;
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
    color: #334155;
    text-decoration: none;
    border-radius: 0.375rem;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  & a:hover {
    background: #f1f5f9;
    color: #0f172a;
  }

  & a.active {
    background: #e2e8f0;
    color: #0f172a;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    & {
      width: 100%;
      height: auto;
      position: static;
    }
  }
`; 