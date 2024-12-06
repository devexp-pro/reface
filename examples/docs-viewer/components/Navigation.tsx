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
    padding: 1rem;
    border-right: 1px solid #e2e8f0;
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
    margin: 0.25rem 0;
  }

  & a {
    display: block;
    padding: 0.25rem 0;
    color: #64748b;
    text-decoration: none;
    font-size: var(--text-sm);
    transition: color 0.2s;
  }

  & a:hover {
    color: #0f172a;
  }

  & a.active {
    color: #2563eb;
    font-weight: 500;
  }

  & ul {
    margin-left: 1rem;
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