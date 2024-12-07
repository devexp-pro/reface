import { createElement, Fragment, type Template } from "../../../source/mod.ts";
import { Container, Header, Layout, Logo } from "./Layout.tsx";
import { Navigation } from "./Navigation.tsx";
import { Content, DocContent, TableOfContents } from "./Content.tsx";
import type { DocSection } from "../utils/docs.tsx";
import { styled } from "../../../source/mod.ts";

interface DocsViewerProps {
  sections: DocSection[];
  currentPath?: string;
}

const PageTransition = styled.div`
  & {
    animation: fadeIn 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export function DocsViewer({ sections, currentPath = "" }: DocsViewerProps): Template {
  const currentPage = sections
    .flatMap(s => s.pages)
    .find(p => p.path === currentPath);

  return (
    <Container>
      <Header>
        <Logo>
          <div class="logo-symbol"></div>
          <div class="logo-text">
            <div class="brand">Reface</div>
            <div class="subtitle">Documentation</div>
          </div>
        </Logo>
      </Header>
      
      <Layout>
        <Navigation sections={sections} currentPath={currentPath} />
        <Content>
          <PageTransition>
            {currentPage ? (
              <DocContent>
                {currentPage.content.content}
              </DocContent>
            ) : (
              <p>Select a page from the navigation</p>
            )}
          </PageTransition>
        </Content>
        {currentPage && (
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
        )}
      </Layout>
    </Container>
  );
} 