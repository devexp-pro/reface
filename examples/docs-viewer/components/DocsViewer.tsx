import {
  createElement,
  Fragment,
  type Template,
} from "../../../source/mod.ts";
import { Container, Header, Layout } from "./Layout.tsx";
import { Navigation } from "./Navigation.tsx";
import { Content, DocContent, TableOfContents } from "./Content.tsx";
import type { DocSection } from "../utils/docs.ts";

interface DocsViewerProps {
  sections: DocSection[];
  currentPath?: string;
}

export function DocsViewer({ sections, currentPath = "" }: DocsViewerProps): Template {
  const currentPage = sections
    .flatMap(s => s.pages)
    .find(p => p.path === currentPath);

  return (
    <Container>
      <Header>
        <img src="/_assets/logo.svg" alt="Reface Logo" />
        <h1>Reface Documentation</h1>
      </Header>
      
      <Layout>
        <Navigation>
          {sections.map(section => (
            <div>
              <h3>{section.title}</h3>
              <ul>
                {section.pages.map(page => {
                  const fullPath = `${section.title}/${page.path}`;
                  return (
                    <li>
                      <a 
                        href={`/${fullPath}`}
                        class={currentPath === fullPath ? "active" : ""}
                      >
                        {page.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Navigation>

        <Content>
          {currentPage ? (
            <>
              <DocContent>
                {currentPage.content.content}
              </DocContent>
              <TableOfContents>
                <h4>On this page</h4>
                <ul>
                  {currentPage.content.headings.map(heading => (
                    <li 
                      style={`margin-left: ${(heading.level - 1) * 1}rem`}
                    >
                      <a href={`#${heading.slug}`}>{heading.text}</a>
                    </li>
                  ))}
                </ul>
              </TableOfContents>
            </>
          ) : (
            <p>Select a page from the navigation</p>
          )}
        </Content>
      </Layout>
    </Container>
  );
} 