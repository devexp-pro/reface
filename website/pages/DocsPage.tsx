import { styled } from "@reface/plugins/styled";
import { Container, Header, Layout } from "../components/Layout.tsx";
import { Logo, LogoText, BrandName, BrandTagline } from "../components/Logo.tsx";
import { Navigation } from "../components/Navigation.tsx";
import { Content, DocContent, TableOfContents } from "../components/Content.tsx";
import type { DocSection, DocPage } from "../utils/docs.tsx";
import { html } from "@reface";

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

function extractTextFromMarkdown(text: string): string {
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

const MobileMenuButton = styled.button`
  & {
    display: none;
    padding: 0.5rem;
    cursor: pointer;
    background: none;
    border: none;
  }

  @media (max-width: 768px) {
    & {
      display: flex;
      align-items: center;
    }
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    stroke: currentColor;
    stroke-width: 2;
  }
`;

const MobileNav = styled.div`
  & {
    display: none;
  }

  @media (max-width: 768px) {
    &.mobile-nav {
      position: fixed;
      top: 4rem;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      z-index: 50;
      overflow-y: auto;
      padding: 1rem;
      border-top: 1px solid var(--color-border);
    }

    &.is-open {
      display: block;
    }
  }
`;

export default function DocsPage({ sections, pages, currentPath }: DocsViewerProps) {
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

        <MobileMenuButton id="menu-toggle">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </MobileMenuButton>
      </Header>
      
      <Layout>
        <Navigation 
          sections={sections} 
          currentPath={currentPath} 
        />

        <MobileNav id="mobile-nav" class="mobile-nav">
          <Navigation 
            sections={sections} 
            currentPath={currentPath} 
          />
          {currentPage && currentPage.content.headings.length > 0 && (
            <div style={{ marginTop: "2rem" }}>
              <h4>On this page</h4>
              <ul>
                {currentPage.content.headings.map(heading => (
                  <TocItem style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}>
                    <TocLink href={`#${heading.slug}`}>
                      {extractTextFromMarkdown(heading.text)}
                    </TocLink>
                  </TocItem>
                ))}
              </ul>
            </div>
          )}
        </MobileNav>

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
                <TocItem style={{ paddingLeft: `${(heading.level - 1) * 0.75}rem` }}>
                  <TocLink href={`#${heading.slug}`}>
                    {extractTextFromMarkdown(heading.text)}
                  </TocLink>
                </TocItem>
              ))}
            </ul>
          </TableOfContents>
        )}
      </Layout>

      <script>
        {html`
          const menuToggle = document.getElementById('menu-toggle');
          const mobileNav = document.getElementById('mobile-nav');
          const menuIcon = menuToggle.querySelector('svg path');

          menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('is-open');
            if (mobileNav.classList.contains('is-open')) {
              menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12');
            } else {
              menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            }
          });

          // Закрываем меню при клике на ссылку
          mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
              mobileNav.classList.remove('is-open');
              menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            });
          });
        `}
      </script>
    </Container>
  );
}