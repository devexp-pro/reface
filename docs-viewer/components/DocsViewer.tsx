import { createElement } from "@reface/jsx";
import type { Template } from "@reface/types";
import { styled } from "@reface/elements";
import { Container, Header, Layout, Logo } from "./Layout.tsx";
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

const StyledLogo = styled.div`
  & {
    display: flex;
    align-items: center;
  }
`;

const LogoSymbol = styled.div`
  & {
    width: 2rem;
    height: 2rem;
    background: var(--color-primary);
    border-radius: 0.5rem;
  }
`;

const LogoText = styled.div`
  & {
    margin-left: 0.75rem;
  }
`;

const BrandText = styled.div`
  & {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary);
  }
`;

const SubtitleText = styled.div`
  & {
    font-size: 0.875rem;
    color: #64748b;
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

export function DocsViewer({ sections, pages, currentPath }: DocsViewerProps): Template {
  const currentPage = currentPath ? pages.get(currentPath) : pages.get("readme");

  return (
    <Container>
      <Header>
        <Logo>
          <StyledLogo>
            <LogoSymbol />
            <LogoText>
              <BrandText>Reface</BrandText>
              <SubtitleText>Documentation</SubtitleText>
            </LogoText>
          </StyledLogo>
        </Logo>
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
                  <TocLink href={`#${heading.slug}`}>{heading.text}</TocLink>
                </TocItem>
              ))}
            </ul>
          </TableOfContents>
        )}
      </Layout>
    </Container>
  );
} 