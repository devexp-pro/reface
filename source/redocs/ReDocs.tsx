import { component } from "@reface";
import { styled } from "@recast";
import { Grid, GridCol, Panel, RefaceUI, Stack } from "@reface-ui";
import type { DocPage, DocSection, TableOfContentsHeading } from "./types.ts";
import { ReDocsLogo } from "../reface-ui/reface/Logo.tsx";
import { type ScriptDoc } from "./loader/scripts.ts";
import { renderDocNode } from "./components/DocNode.tsx";
import { ScriptView } from "./components/ScriptView.tsx";

interface ReDocsProps {
  sections: DocSection[];
  pages: Map<string, DocPage>;
  currentPath?: string;
  publicPath?: string;
  scripts?: ScriptDoc;
}

// Styled Components
const Header = styled.header /*css*/`
  & {
    padding: var(--spacing-md) var(--spacing-lg);
    border-bottom: 1px solid var(--colors-border-base);
    background: var(--colors-bg-panel);
  }
`;

const Logo = styled.div /*css*/`
  & {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--typography-sizes-xl);
    font-weight: var(--typography-weights-bold);
    color: var(--colors-text-label);
  }
`;

const Content = styled.main /*css*/`
  & {
    height: calc(100vh - 64px);
    overflow-y: auto;
    padding: var(--spacing-lg);
  }
`;

const Sidebar = styled.aside /*css*/`
  & {
    height: 100%;
    width: 280px;
    border-right: 1px solid var(--colors-border-base);
    background: var(--colors-bg-panel);
    padding: var(--spacing-lg) var(--spacing-md);
    overflow-y: auto;
  }
`;

const TocSidebar = styled.aside /*css*/`
  & {
    height: 100%;
    width: 240px;
    border-left: 1px solid var(--colors-border-base);
    background: var(--colors-bg-panel);
    padding: var(--spacing-lg) var(--spacing-md);
    overflow-y: auto;
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

// Navigation Components
const Navigation = component((
  props: { sections: DocSection[]; currentPath?: string; publicPath?: string },
) => (
  <nav>
    {props.sections.map((section) => (
      <NavSection>
        <NavTitle>{section.title}</NavTitle>
        <NavList>
          {section.items.map((item) => (
            <NavItem>
              <NavLink
                href={`${props.publicPath || "/"}${item.path}`}
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

// API Reference Navigation
const ApiNavigation = component((props: { scripts: ScriptDoc }) => (
  <nav>
    <NavSection>
      <NavTitle>API Reference</NavTitle>
      <NavList>
        {props.scripts.navigation.map((item) => (
          <NavItem>
            <NavLink href={`#${item.url}`}>
              {item.name}
            </NavLink>
          </NavItem>
        ))}
      </NavList>
    </NavSection>
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

  console.log(props.currentPath, props.scripts?.scripts.map((s) => s.url));

  const currentScript = props.scripts?.scripts.find(
    (script) => script.url === props.currentPath,
  );

  return (
    <RefaceUI>
      <Stack direction="vertical" style="height: 100vh;">
        <Header>
          <Logo>
            <ReDocsLogo size={32} />
            ReDocs
          </Logo>
        </Header>

        <Grid
          columns="280px 1fr 240px"
          gap="none"
          style="flex: 1; overflow: hidden;"
        >
          <Sidebar>
            <Stack direction="vertical" gap="xl">
              <Navigation
                sections={props.sections}
                currentPath={props.currentPath}
                publicPath={props.publicPath}
              />
              {props.scripts && <ApiNavigation scripts={props.scripts} />}
            </Stack>
          </Sidebar>

          <Content>
            {currentScript
              ? (
                <Panel style="max-width: 900px; margin: 0 auto;">
                  <ScriptView
                    name={currentScript.name}
                    url={currentScript.url}
                    nodes={currentScript.nodes}
                  />
                </Panel>
              )
              : currentPage
              ? (
                <Panel style="max-width: 900px; margin: 0 auto;">
                  {currentPage.content.content}
                </Panel>
              )
              : (
                <Panel>
                  <p>Page not found</p>
                </Panel>
              )}
          </Content>

          {currentPage?.content.headings.length > 0 && !currentScript && (
            <TocSidebar>
              <TableOfContents
                headings={currentPage.content.headings}
              />
            </TocSidebar>
          )}
        </Grid>
      </Stack>
    </RefaceUI>
  );
});
