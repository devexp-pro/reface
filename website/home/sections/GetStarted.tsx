import { component, styled } from "@recast";
import { Icon } from "@reface-ui";
import { Section } from "../../components/Section.tsx";
import { Logo } from "../../components/Logo.tsx";
import { Button } from "../../components/Button.tsx";

const Container = styled.div /*css*/`
  & {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
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

const TryNow = styled.div /*css*/`
  & {
    font-size: 4rem;
    font-weight: 900;
    line-height: 1.2;
    background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 768px) {
    & {
      font-size: 3rem;
    }
  }
`;

const Title = styled.div /*css*/`
  & {
    text-align: center;
  }
`;

const ButtonGroup = styled.div /*css*/`
  & {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
  }

  & .button__icon {
    width: 1.25rem;
    height: 1.25rem;
    font-size: 1.25rem !important;
    margin-right: 0.75rem;
  }

  @media (max-width: 768px) {
    & {
      flex-direction: column;
      align-items: stretch;
      max-width: 300px;
      margin: 3rem auto 0;
      gap: 1rem;
    }
  }
`;

export function GetStarted() {
  return (
    <Section variant="get-started">
      <Container>
        <Title>
          <TryNow>Try Now</TryNow>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
        </Title>
        <ButtonGroup>
          <Button href="/docs">
            <Icon name="Book" class="button__icon" />
            Documentation
          </Button>
          <Button href="/demo" variant="secondary">
            <Icon name="Play" class="button__icon" />
            Demo
          </Button>
          <Button href="https://github.com/your-repo" variant="secondary">
            <Icon name="github-logo" class="button__icon" />
            GitHub
          </Button>
        </ButtonGroup>
      </Container>
    </Section>
  );
}
