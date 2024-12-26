import { styled } from "@reface/plugins/styled";
import {
  Container,
  DocsLink,
  GitHubButton,
  Header,
  HeaderLinks,
} from "../components/Layout.tsx";
import { Logo } from "../components/Logo.tsx";
import { DemoReface } from "../components/DemoReface.tsx";

const Hero = styled.div`
  & {
    text-align: center;
    max-width: 48rem;
    margin: 4rem auto;
    padding: 0 2rem;
  }

  @media (min-width: 768px) {
    & {
      margin: 6rem auto;
    }
  }
`;

const Title = styled.h1`
  & {
    font-size: 4rem;
    font-weight: 800;
    letter-spacing: -0.025em;
    margin: 0 0 0.5rem;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (min-width: 768px) {
    & {
      font-size: 5rem;
    }
  }
`;

const Subtitle = styled.h2`
  & {
    font-size: 2.25rem;
    font-weight: 700;
    color: #1e293b;
    margin: 0 0 1rem;
    opacity: 0;
    animation: fadeUp 0.5s ease-out 0.6s forwards;
  }

  @media (min-width: 768px) {
    & {
      font-size: 3rem;
    }
  }
`;

const Description = styled.p`
  & {
    font-size: 1.125rem;
    color: #64748b;
    margin: 0 0 2rem;
    line-height: 1.7;
    opacity: 0;
    animation: fadeUp 0.5s ease-out 0.9s forwards;
  }

  @media (min-width: 768px) {
    & {
      font-size: 1.25rem;
    }
  }
`;

const Demo = styled.div`
  & {
    max-width: 64rem;
    margin: 0 auto 6rem;
    padding: 0 2rem;
  }
`;

const Features = styled.div`
  & {
    display: grid;
    gap: 2rem;
    padding: 0 2rem;
    max-width: 72rem;
    margin: 0 auto 4rem;
  }

  @media (min-width: 768px) {
    & {
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem;
    }
  }

  @media (min-width: 1024px) {
    & {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`;

const Feature = styled.div`
  & {
    text-align: left;
  }
`;

const FeatureIcon = styled.div`
  & {
    width: 4rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    border-radius: 1rem;
    color: white;
    margin-bottom: 1.5rem;
    box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.3);
  }
  & svg {
    width: 1.75rem;
    height: 1.75rem;
    stroke-width: 1.5;
  }
`;

const FeatureTitle = styled.h3`
  & {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
    color: #1e293b;
  }
`;

const FeatureDescription = styled.p`
  & {
    color: #64748b;
    line-height: 1.6;
    margin: 0;
  }
`;

const BigLogo = styled.div`
  & {
    font-size: 3rem;
    line-height: 1;
    width: 6rem;
    height: 6rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    border-radius: 1.5rem;
    color: white;
    font-weight: 600;
    margin: 0 auto 2rem;
  }

  @media (min-width: 768px) {
    & {
      font-size: 4rem;
      width: 8rem;
      height: 8rem;
      border-radius: 2rem;
    }
  }
`;

const Icons = {
  TypeSafe: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"
      />
      <line
        strokeLinecap="round"
        strokeLinejoin="round"
        x1="16"
        y1="8"
        x2="2"
        y2="22"
      />
      <line
        strokeLinecap="round"
        strokeLinejoin="round"
        x1="17.5"
        y1="15"
        x2="9"
        y2="15"
      />
    </svg>
  ),
  Composition: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <path d="M10 7h4M7 10v4M17 10v4M10 17h4" />
    </svg>
  ),
  Plugin: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M9 3H5a2 2 0 0 0-2 2v4" />
      <path d="M9 21H5a2 2 0 0 1-2-2v-4" />
      <path d="M15 3h4a2 2 0 0 1 2 2v4" />
      <path d="M15 21h4a2 2 0 0 0 2-2v-4" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  ),
  Styled: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
      <circle cx="8" cy="6" r="1" fill="currentColor" />
      <circle cx="14" cy="12" r="1" fill="currentColor" />
      <circle cx="10" cy="18" r="1" fill="currentColor" />
    </svg>
  ),
  Partial: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect
        strokeLinecap="round"
        strokeLinejoin="round"
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 21V9" />
    </svg>
  ),
  Framework: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2L2 7l10 5 10-5-10-5z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 17l10 5 10-5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2 12l10 5 10-5" />
    </svg>
  ),
};

const HeroLogo = styled.div`
  & {
    position: relative;
    width: fit-content;
    margin: 0 auto 2rem;
    display: flex;
    align-items: center;
    font-size: 4rem;
    line-height: 1;
    opacity: 0;
    animation: fadeIn 0.5s ease-out forwards;
  }

  @media (min-width: 768px) {
    & {
      font-size: 5rem;
    }
  }
`;

const LogoSquare = styled.div`
  & {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1.5em;
    height: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    border-radius: 0.25em;
    color: white;
    font-weight: 600;
    z-index: 1;
    box-shadow: 0 10px 30px -10px rgba(37, 99, 235, 0.3);
  }
`;

const LogoText = styled.div`
  & {
    font-weight: 800;
    white-space: nowrap;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: 1.75em;
    background: linear-gradient(
      to right,
      transparent 0%,
      #1e293b 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    mix-blend-mode: difference;
    opacity: 0;
    animation: textReveal 0.5s ease-out 0.3s forwards;
  }
`;

const keyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes textReveal {
    from {
      opacity: 0;
      transform: translateX(-0.5em);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const GlobalStyles = styled.div`
  ${keyframes}
`;

export default function HomePage() {
  return (
    <>
      <GlobalStyles />
      <Container>
        <Header>
          <Logo />
          <HeaderLinks>
            <DocsLink href="/docs">Documentation</DocsLink>
            <GitHubButton href="https://github.com/vseplet/reface">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </GitHubButton>
          </HeaderLinks>
        </Header>

        <Hero>
          <HeroLogo>
            <LogoSquare>R</LogoSquare>
            <LogoText>eface</LogoText>
          </HeroLogo>
          <Subtitle>Meta-Framework for Modern Web Applications</Subtitle>
          <Description>
            Zero-build framework that brings interactivity through HTMX, modern
            templating with JSX, and powerful server-side features - all without
            the complexity of traditional SPAs.
          </Description>
        </Hero>

        <Demo>
          <DemoReface />
        </Demo>

        <Features>
          <Feature>
            <FeatureIcon>
              <Icons.TypeSafe />
            </FeatureIcon>
            <FeatureTitle>Type-safe Templates</FeatureTitle>
            <FeatureDescription>
              Write templates using JSX or template literals with full
              TypeScript support. Get compile-time safety and great DX.
            </FeatureDescription>
          </Feature>

          <Feature>
            <FeatureIcon>
              <Icons.Composition />
            </FeatureIcon>
            <FeatureTitle>Template Composition</FeatureTitle>
            <FeatureDescription>
              Compose complex UIs from simple templates. Mix JSX and template
              literals for maximum flexibility.
            </FeatureDescription>
          </Feature>

          <Feature>
            <FeatureIcon>
              <Icons.Plugin />
            </FeatureIcon>
            <FeatureTitle>Plugin System</FeatureTitle>
            <FeatureDescription>
              Extend functionality through plugins. Create custom
              transformations and optimizations for your templates.
            </FeatureDescription>
          </Feature>

          <Feature>
            <FeatureIcon>
              <Icons.Styled />
            </FeatureIcon>
            <FeatureTitle>Styled Components</FeatureTitle>
            <FeatureDescription>
              Type-safe CSS-in-JS with theme support. Create isolated and
              reusable styled components.
            </FeatureDescription>
          </Feature>

          <Feature>
            <FeatureIcon>
              <Icons.Partial />
            </FeatureIcon>
            <FeatureTitle>Partial System</FeatureTitle>
            <FeatureDescription>
              Create interactive components with HTMX integration. Update parts
              of your page without writing JavaScript.
            </FeatureDescription>
          </Feature>

          <Feature>
            <FeatureIcon>
              <Icons.Framework />
            </FeatureIcon>
            <FeatureTitle>Meta-Framework</FeatureTitle>
            <FeatureDescription>
              Complete solution for rendering and serving web applications.
              Build scalable applications with focus on performance.
            </FeatureDescription>
          </Feature>
        </Features>
      </Container>
    </>
  );
}
