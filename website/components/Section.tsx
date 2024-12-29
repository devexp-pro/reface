import { component, styled } from "@recast";

const StyledSection = styled.section /*css*/`
  & {
    padding: 8rem 2rem;
  }

  &[data-variant="hero"] {
    background: 
      radial-gradient(circle at 0% 0%, rgba(236, 72, 153, 0.08) 0%, transparent 30%),
      radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 30%),
      radial-gradient(circle at 100% 100%, rgba(56, 189, 248, 0.08) 0%, transparent 30%),
      radial-gradient(circle at 0% 100%, rgba(74, 222, 128, 0.08) 0%, transparent 30%),
      linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  }

  &[data-variant="problems"] {
    background: 
      radial-gradient(circle at 0% 100%, rgba(96, 165, 250, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
      linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  }

  &[data-variant="solution"] {
    background: 
      radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 0% 0%, rgba(219, 39, 119, 0.08) 0%, transparent 50%),
      linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  }

  &[data-variant="ecosystem"] {
    background: 
      radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 100% 0%, rgba(124, 58, 237, 0.08) 0%, transparent 50%),
      linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  }

  &[data-variant="get-started"] {
    background: 
      radial-gradient(circle at 100% 100%, rgba(56, 189, 248, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.08) 0%, transparent 50%),
      linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  }

  [data-theme="dark"] &[data-variant="hero"] {
    background: 
      radial-gradient(circle at 0% 0%, rgba(236, 72, 153, 0.03) 0%, transparent 30%),
      radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.03) 0%, transparent 30%),
      radial-gradient(circle at 100% 100%, rgba(56, 189, 248, 0.03) 0%, transparent 30%),
      radial-gradient(circle at 0% 100%, rgba(74, 222, 128, 0.03) 0%, transparent 30%),
      linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  }

  [data-theme="dark"] &[data-variant="problems"] {
    background: 
      radial-gradient(circle at 0% 100%, rgba(96, 165, 250, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 100% 0%, rgba(59, 130, 246, 0.03) 0%, transparent 50%),
      linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  }

  [data-theme="dark"] &[data-variant="solution"] {
    background: 
      radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 0% 0%, rgba(219, 39, 119, 0.03) 0%, transparent 50%),
      linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  }

  [data-theme="dark"] &[data-variant="ecosystem"] {
    background: 
      radial-gradient(circle at 0% 100%, rgba(139, 92, 246, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 100% 0%, rgba(124, 58, 237, 0.03) 0%, transparent 50%),
      linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  }

  [data-theme="dark"] &[data-variant="get-started"] {
    background: 
      radial-gradient(circle at 100% 100%, rgba(56, 189, 248, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 0% 0%, rgba(14, 165, 233, 0.03) 0%, transparent 50%),
      linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  }
`;

const Title = styled.h2 /*css*/`
  & {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    & {
      font-size: 2.5rem;
    }
  }
`;

const Subtitle = styled.p /*css*/`
  & {
    font-size: 1.25rem;
    color: var(--color-text-light);
    max-width: 768px;
    margin: 0 auto 4rem;
    text-align: center;
  }

  @media (max-width: 768px) {
    & {
      font-size: 1.125rem;
    }
  }
`;

type SectionProps = {
  class?: string;
  variant?: "hero" | "problems" | "solution" | "ecosystem" | "get-started";
  title?: string;
  subtitle?: string;
};

export const Section = component((
  props: SectionProps,
  children: JSX.Element,
) => (
  <StyledSection class={props.class} data-variant={props.variant}>
    {props.title && <Title>{props.title}</Title>}
    {props.subtitle && <Subtitle>{props.subtitle}</Subtitle>}
    {children}
  </StyledSection>
));
