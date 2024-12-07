import { createElement, Fragment, type Template } from "../../../source/mod.ts";
import { styled } from "../../../source/mod.ts";
import type { DocSection } from "../utils/docs.tsx";

interface NavigationProps {
  sections: DocSection[];
  currentPath?: string;
}

const NavContainer = styled.nav`
  & {
    width: 16rem;
    padding: 1.5rem;
    background: white;
    border-radius: 0.75rem;
    border: 1px solid rgba(226, 232, 240, 0.8);
    height: fit-content;
    position: sticky;
    top: 5rem;
    overflow-y: auto;
    scrollbar-gutter: stable;
    flex-shrink: 0;
  }

  @media (max-width: 1024px) {
    & {
      position: relative;
      top: 0;
    }
  }
`;

const Section = styled.div`
  & {
    margin-bottom: 2rem;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  & {
    font-size: var(--text-sm);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #64748b;
    margin: 0 0 0.75rem;
    padding-left: 0.75rem;
  }
`;

const NavList = styled.ul`
  & {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const NavItem = styled.li`
  & {
    margin: 0.125rem 0;
  }

  & a {
    display: block;
    padding: 0.5rem 0.75rem;
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

  & a.active {
    color: #2563eb;
    background: rgba(37, 99, 235, 0.1);
    font-weight: 500;
  }

  & ul {
    margin: 0.25rem 0 0.25rem 1rem;
    border-left: 1px solid rgba(226, 232, 240, 0.8);
  }
`;

function renderNavItems(pages: DocSection["pages"], currentPath?: string, parentPath = ""): Template {
  return (
    <NavList>
      {pages.map(page => {
        const fullPath = parentPath ? `${parentPath}/${page.path}` : page.path;
        const isActive = currentPath === fullPath;
        const hasChildren = page.children && page.children.length > 0;

        return (
          <NavItem>
            <a 
              href={`/docs/${fullPath}`}
              class={isActive ? "active" : ""}
            >
              {page.title}
            </a>
            {hasChildren? renderNavItems(page.children, currentPath, fullPath) : ''}
          </NavItem>
        );
      })}
    </NavList>
  );
}

export function Navigation({ sections, currentPath }: NavigationProps): Template {
  return (
    <NavContainer>
      {sections.map(section => (
        <Section>
          <SectionTitle>{section.title}</SectionTitle>
          {renderNavItems(section.pages, currentPath)}
        </Section>
      ))}
    </NavContainer>
  );
} 