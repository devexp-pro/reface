import { createElement } from "@reface/jsx";
import type { Template } from "@reface/types";
import { styled } from "@reface/elements";
import { Container, Header, Layout } from "./Layout.tsx";
import { Logo, LogoText, BrandName, BrandTagline } from "./Logo.tsx";
import { Navigation } from "./Navigation.tsx";
import { Content, DocContent, TableOfContents } from "./Content.tsx";
import type { DocSection, DocPage } from "../utils/docs.tsx";

interface DocsViewerProps {
  sections: DocSection[];
  pages: Map<string, DocPage>;
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


const TocItem = styled.li`
  & {
    margin: 0.25rem 0;
  }
`;

const TocLink = styled.a`
  & {
    color: #64748b;
    text-decoration: none;
    
    &:hover {
      color: #2563eb;
    }
  }
`;

// Функция для извлечения текста из markdown-сылки
function extractTextFromMarkdown(text: string): string {
  // Паттерн для поиска markdown-ссылок: [text](./path.md)
  const linkPattern = /\[(.*?)\]\(.*?\)/;
  const match = text.match(linkPattern);
  return match ? match[1] : text;
}

const LogoLink = styled.a`
  & {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    text-decoration: none;
  }
`;

export function DocsViewer({ sections, pages, currentPath }: DocsViewerProps): Template {
  const currentPage = currentPath ? pages.get(currentPath) : pages.get("readme");

  return (
    <Container>
      <Header>
        <LogoLink href="/">
          <Logo />
          <LogoText>
            <BrandName>Reface</BrandName>
            <BrandTagline>Documentation</BrandTagline>
          </LogoText>
        </LogoLink>
      </Header>
      
      <Layout>
        <Navigation 
          sections={sections} 
          currentPath={currentPath} 
        />

        <Content>
          <PageTransition>
            {currentPage ? (
              <DocContent>
                {currentPage.content.content}
              </DocContent>
            ) : (
              <p>Page not found</p>
            )}
          </PageTransition>
        </Content>

        {currentPage && currentPage.content.headings.length > 0 && (
          <TableOfContents>
            <h4>On this page</h4>
            <ul>
              {currentPage.content.headings.map(heading => (
                <TocItem style={`padding-left: ${(heading.level - 1) * 0.75}rem`}>
                  <TocLink href={`#${heading.slug}`}>
                    {extractTextFromMarkdown(heading.text)}
                  </TocLink>
                </TocItem>
              ))}
            </ul>
          </TableOfContents>
        )}
      </Layout>
    </Container>
  );
} 