import { component, html, styled } from "@recast";
import { Logo } from "../components/Logo.tsx";
import { Button } from "../components/Button.tsx";
import { Icon } from "@reface-ui";

const StyledHeader = styled.header /*css*/`
  & {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--header-height);
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    z-index: 100;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  [data-theme="dark"] & {
    background: rgba(15, 23, 42, 0.8);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
`;

const ThemeToggle = styled.button /*css*/`
  & {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    color: var(--color-text);
    border-radius: 0.5rem;
    transition: background-color 0.2s;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  [data-theme="dark"] & {
    color: var(--color-text-light);
  }

  [data-theme="dark"] &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const clientScript = /*js*/ `
  (() => {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const html = document.documentElement;
      const isDark = html.getAttribute('data-theme') === 'dark';
      html.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  })();
`;

const Container = styled.div /*css*/`
  & {
    max-width: var(--max-width);
    margin: 0 auto;
    padding: 0 2rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const LogoWrapper = styled.div /*css*/`
  & {
    font-size: 1.5rem;
  }
`;

const Nav = styled.nav /*css*/`
  & {
    display: flex;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    & {
      display: none;
    }
  }
`;

export function Header() {
  return (
    <StyledHeader>
      <Container>
        <LogoWrapper>
          <Logo only />
        </LogoWrapper>
        <Nav>
          <Button href="/docs/README" variant="secondary">
            Documentation
          </Button>
          <Button href="/restory" variant="secondary">
            Reface UI
          </Button>
          <Button href="https://github.com/your-repo">GitHub</Button>
          <ThemeToggle class="theme-toggle">
            <Icon name="moon" />
          </ThemeToggle>
        </Nav>
      </Container>
      <script>{html(clientScript)}</script>
    </StyledHeader>
  );
}
