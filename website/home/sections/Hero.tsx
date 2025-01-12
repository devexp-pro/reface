import { styled } from "@recast";
import { Button } from "../../components/Button.tsx";
import { Logo } from "../../components/Logo.tsx";
import { Section } from "../../components/Section.tsx";

const Container = styled.div /*css*/`
  & {
    max-width: var(--max-width);
    margin: 0 auto;
  }
`;

const Title = styled.h1 /*css*/`
  & {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, 
      var(--color-text) 0%,
      #4f46e5 50%,
      #7c3aed 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    text-align: center;
    display: flex;
    justify-self: center;

  }

  [data-theme="dark"] & {
    background: linear-gradient(135deg,
      #ffffff 0%,
      #93c5fd 50%,
      #e879f9 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    & {
      font-size: 2.5rem;
    }
  }

  @media (max-width: 480px) {
    & {
      font-size: 2rem;
    }
  }
`;

const Subtitle = styled.p /*css*/`
  & {
    font-size: 1.25rem;
    color: var(--color-text-light);
    max-width: 800px;
    margin: 0 auto 2rem;
    text-align: center;
  }

  @media (max-width: 480px) {
    & {
      font-size: 1rem;
    }
  }
`;

const Buttons = styled.div /*css*/`
  & {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  @media (max-width: 768px) {
    & {
      flex-direction: column;
      align-items: stretch;
    }
  }
`;

const LogoWrapper = styled.div /*css*/`
  & {
    margin-bottom: 2rem;
    font-size: 8rem;
  }

  & svg {
    width: 8rem;
    height: 8rem;
    filter: drop-shadow(0 10px 30px rgba(37, 99, 235, 0.2));
  }

  @media (max-width: 768px) {
    & {
      font-size: 6rem;
    }

    & svg {
      width: 6rem;
      height: 6rem;
    }
  }
`;

export function Hero() {
  return (
    <Section
      variant="hero"
      class="hero-section"
      style="min-height: 100vh; padding-top: calc(var(--header-height) + 4rem); padding-bottom: 4rem; display: flex; align-items: center; justify-content: center; text-align: center;"
    >
      <Container>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Title>
          Meta-Framework for Modern<br />Web Applications
        </Title>
        <Subtitle>
          Zero-build framework that brings interactivity through HTMX, modern
          templating with JSX, and powerful server-side features - all without
          the complexity of traditional SPAs.
        </Subtitle>
        <Buttons>
          <Button href="/docs">Get Started</Button>
          <Button href="/demo" variant="secondary">View Demo</Button>
        </Buttons>
      </Container>
    </Section>
  );
}
