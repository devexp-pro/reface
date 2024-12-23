import { styled } from "@reface/plugins/styled";
import { Container, Header, Layout } from "../components/Layout.tsx";
import {
  BrandName,
  BrandTagline,
  Logo,
  LogoText,
} from "../components/Logo.tsx";
import { Navigation } from "../components/Navigation.tsx";
import { MarkdownContent, TableOfContents } from "../modules/markdown/mod.tsx";
import type { DocPage, DocSection } from "../utils/docs.tsx";
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
    background: none;
    border: none;
    cursor: pointer;
    color: var(--color-text);
  }

  @media (max-width: 1024px) {
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

  @media (max-width: 1024px) {
    &.mobile-nav {
      position: fixed;
      top: 4rem;
      left: 0;
      right: 0;
      bottom: 0;
      background: white;
      z-index: 50;
      overflow-y: auto;
      padding: 1.5rem;
      border-top: 1px solid var(--color-border);
      transform: translateX(-100%);
      transition: transform 0.3s ease-in-out;
      -webkit-overflow-scrolling: touch;
    }

    &.is-open {
      display: block;
      transform: translateX(0);
    }
  }
`;

const ContentWrapper = styled.div`
  & {
    flex: 1;
    min-width: 0;
  }
`;

const MobileToc = styled.div`
  & {
    display: none;
    margin: -1rem -1rem 2rem;
    padding: 1rem;
    background: var(--color-background);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  @media (max-width: 1024px) {
    & {
      display: block;
    }
  }
`;

export default function DocsPage(
  { sections, pages, currentPath }: DocsViewerProps,
) {
  const currentPage = currentPath
    ? pages.get(currentPath)
    : pages.get("readme");

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
        </MobileNav>

        <ContentWrapper>
          {currentPage && currentPage.content.headings.length > 0 && (
            <MobileToc>
              <TableOfContents
                headings={currentPage.content.headings}
                class="mobile"
              />
            </MobileToc>
          )}

          <PageTransition>
            {currentPage
              ? (
                <MarkdownContent>
                  {currentPage.content.content}
                </MarkdownContent>
              )
              : <p>Page not found</p>}
          </PageTransition>
        </ContentWrapper>

        {currentPage && currentPage.content.headings.length > 0 && (
          <TableOfContents
            headings={currentPage.content.headings}
            class="desktop"
          />
        )}
      </Layout>

      <script>
        {html`
          const menuToggle = document.getElementById('menu-toggle');
          const mobileNav = document.getElementById('mobile-nav');
          const menuIcon = menuToggle.querySelector('svg path');
          const body = document.body;

          menuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('is-open');
            body.style.overflow = mobileNav.classList.contains('is-open') ? 'hidden' : '';
            
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
              body.style.overflow = '';
              menuIcon.setAttribute('d', 'M4 6h16M4 12h16M4 18h16');
            });
          });
        `}
      </script>
    </Container>
  );
}
