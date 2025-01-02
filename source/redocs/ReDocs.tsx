import { component, styled } from "@reface/recast";
import { Grid, GridCol, Panel, RefaceUI, Stack } from "@reface/ui";
import type { DocPage, DocSection, TableOfContentsHeading } from "./types.ts";

interface ReDocsProps {
  sections: DocSection[];
  pages: Map<string, DocPage>;
  currentPath?: string;
}

// Styled Components
const Header = styled.header /*css*/`
  & {
    padding: var(--spacing-md);
    border-bottom: 1px solid var(--colors-border-base);
  }
`;

const Logo = styled.div /*css*/`
  & {
    font-size: var(--typography-sizes-lg);
    font-weight: var(--typography-weights-bold);
    color: var(--colors-text-label);
  }
`;

const Content = styled.main /*css*/`
  & {
    height: calc(100vh - var(--header-height));
    overflow-y: auto;
  }
`;

const Sidebar = styled.aside /*css*/`
  & {
    height: 100%;
    border-right: 1px solid var(--colors-border-base);
    background: var(--colors-bg-panel);
    padding: var(--spacing-md);
  }
`;

const TocSidebar = styled.aside /*css*/`
  & {
    height: 100%;
    border-left: 1px solid var(--colors-border-base);
    background: var(--colors-bg-panel);
    padding: var(--spacing-md);
  }
`;

const NavSection = styled.div /*css*/`
  & {
    margin-bottom: var(--spacing-lg);
  }
`;

const NavTitle = styled.h3 /*css*/`
  & {
    color: var(--colors-text-dimmed);
    font-size: var(--typography-sizes-sm);
    font-weight: var(--typography-weights-semibold);
    margin-bottom: var(--spacing-sm);
    text-transform: uppercase;
  }
`;

const NavList = styled.ul /*css*/`
  & {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const NavItem = styled.li /*css*/`
  & {
    margin: var(--spacing-xs) 0;
  }
`;

const NavLink = styled.a /*css*/`
  & {
    color: var(--colors-text-base);
    text-decoration: none;
    display: block;
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
  }

  &:hover {
    background: var(--colors-bg-hover);
  }

  &[data-active="true"] {
    background: var(--colors-bg-hover);
    color: var(--colors-accent-base);
  }
`;

// Navigation Component
const Navigation = component((
  props: { sections: DocSection[]; currentPath?: string },
) => (
  <nav>
    {props.sections.map((section) => (
      <NavSection>
        <NavTitle>{section.title}</NavTitle>
        <NavList>
          {section.items.map((item) => (
            <NavItem>
              <NavLink
                href={`/${item.path}`}
                data-active={item.path === props.currentPath}
              >
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </NavList>
      </NavSection>
    ))}
  </nav>
));

// TableOfContents Component
const TableOfContents = component((
  props: { headings: TableOfContentsHeading[] },
) => (
  <nav>
    <NavTitle>On this page</NavTitle>
    <NavList>
      {props.headings.map((heading) => (
        <NavItem style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}>
          <NavLink href={`#${heading.slug}`}>
            {heading.text}
          </NavLink>
        </NavItem>
      ))}
    </NavList>
  </nav>
));

// Main Component
export const ReDocs = component((props: ReDocsProps) => {
  const currentPage = props.currentPath
    ? props.pages.get(props.currentPath)
    : props.pages.get("readme");

  return (
    <RefaceUI>
      <Stack direction="vertical" style="height: 100vh;">
        <Header>
          <Logo>ReDocs</Logo>
        </Header>

        <Grid columns={12} gap="none" style="flex: 1; overflow: hidden;">
          <GridCol span={2}>
            <Sidebar>
              <Navigation
                sections={props.sections}
                currentPath={props.currentPath}
              />
            </Sidebar>
          </GridCol>

          <GridCol span={8}>
            <Content>
              {currentPage
                ? (
                  <Panel>
                    {currentPage.content.content}
                  </Panel>
                )
                : (
                  <Panel>
                    <p>Page not found</p>
                  </Panel>
                )}
            </Content>
          </GridCol>

          {currentPage?.content.headings.length > 0 && (
            <GridCol span={2}>
              <TocSidebar>
                <TableOfContents
                  headings={currentPage.content.headings}
                />
              </TocSidebar>
            </GridCol>
          )}
        </Grid>
      </Stack>
    </RefaceUI>
  );
});
