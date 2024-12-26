import type { Template } from "@reface";
import { styled } from "@reface/plugins/styled";
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
    position: sticky;
    top: 5rem;
  }

  @media (max-width: 1024px) {
    & {
      width: 100%;
      position: static;
      padding: 1rem;
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
`;

const NavLink = styled.a`
  & {
    display: block;
    padding: 0.5rem 0.75rem;
    color: #64748b;
    text-decoration: none;
    font-size: var(--text-sm);
    border-radius: 0.375rem;
    transition: all 0.15s;
  }

  &:hover {
    color: #1e293b;
    background: rgba(226, 232, 240, 0.5);
  }

  &.active {
    color: #2563eb;
    background: rgba(37, 99, 235, 0.1);
    font-weight: 500;
  }
`;

export function Navigation(
  { sections, currentPath }: NavigationProps,
): Template {
  return (
    <NavContainer>
      {sections.map((section) => (
        <Section>
          <SectionTitle>{section.title}</SectionTitle>
          <NavList>
            {section.items.map((item) => (
              <NavItem>
                <NavLink
                  href={`/docs/${item.path}`}
                  class={currentPath === item.path ? "active" : ""}
                >
                  {item.title}
                </NavLink>
              </NavItem>
            ))}
          </NavList>
        </Section>
      ))}
    </NavContainer>
  );
}
