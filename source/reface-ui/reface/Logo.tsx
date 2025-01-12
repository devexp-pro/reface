import { component } from "@recast";
import { styled } from "@recast";
import { theme } from "../theme.ts";

const RefaceUIContainer = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.md};
    user-select: none;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
  }

  & .bracket {
    color: ${theme.colors.text.dimmed};
  }

  & .letter {
    color: ${theme.colors.accent.base};
    font-weight: ${theme.typography.weights.semibold};
  }

  & .name {
    color: ${theme.colors.text.base};
    font-weight: ${theme.typography.weights.medium};
  }

  & .type {
    color: ${theme.colors.text.dimmed};
    font-weight: ${theme.typography.weights.normal};
  }
`;

const ReStoryContainer = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.md};
    user-select: none;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
  }

  & .bracket {
    color: ${theme.colors.text.dimmed};
    opacity: 0.7;
  }

  & .name {
    color: ${theme.colors.text.base};
    font-weight: ${theme.typography.weights.medium};
  }

  & .type {
    color: ${theme.colors.accent.base};
    font-weight: ${theme.typography.weights.medium};
  }
`;

const ReCastContainer = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.md};
    user-select: none;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
  }

  & .re {
    color: ${theme.colors.text.base};
    font-weight: ${theme.typography.weights.medium};
  }

  & .cast {
    color: ${theme.colors.accent.base};
    font-weight: ${theme.typography.weights.medium};
  }

  & .backtick {
    color: ${theme.colors.text.dimmed};
    opacity: 0.7;
  }

  & .paren {
    color: ${theme.colors.text.dimmed};
    opacity: 0.7;
  }
`;

const RefaceIconContainer = styled.div /*css*/`
  & {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    color: ${theme.colors.text.base};
    font-weight: ${theme.typography.weights.semibold};
  }

  &.size-default {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.5rem;
    font-size: 1.25rem;
  }

  &.size-large {
    width: 8rem;
    height: 8rem;
    border-radius: 2.4rem;
    font-size: 4rem;
  }
`;

const RefaceTextContainer = styled.div /*css*/`
  & {
    display: flex;
    flex-direction: column;
  }

  & .brand-name {
    color: ${theme.colors.text.base};
    font-weight: ${theme.typography.weights.medium};
    font-size: ${theme.typography.sizes.lg};
  }

  & .brand-tagline {
    color: ${theme.colors.text.dimmed};
    font-size: ${theme.typography.sizes.sm};
  }
`;

const RefaceGroupContainer = styled.div /*css*/`
  & {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  }
`;

const RefaceHeroContainer = styled.div /*css*/`
  & {
    position: relative;
    width: fit-content;
    margin: 0 auto 2rem;
    display: flex;
    align-items: center;
    font-size: 4rem;
    line-height: 1;
    animation: fadeIn 0.5s ease-out forwards;
  }

  @media (min-width: 768px) {
    & {
      font-size: 5rem;
    }
  }
`;

const RefaceHeroSquare = styled.div /*css*/`
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

const RefaceHeroText = styled.div /*css*/`
  & {
    font-weight: 800;
    white-space: nowrap;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    margin-left: 1.75em;
    background: linear-gradient(
      to right,
      transparent 0%,
      #94a3b8 100%
    );
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    mix-blend-mode: difference;
    animation: textReveal 0.5s ease-out 0.3s forwards;
  }
`;

const DevExpContainer = styled.div /*css*/`
  & {
    position: relative;
    display: inline-flex;
    width: fit-content;
    padding: ${theme.spacing.md};
    font-family: ${theme.typography.fonts.mono};
  }

  & .corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border: 1px solid ${theme.colors.accent.base};
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  & .corner-tl {
    top: 0;
    left: 0;
    border-right: 0;
    border-bottom: 0;
  }

  & .corner-tr {
    top: 0;
    right: 0;
    border-left: 0;
    border-bottom: 0;
  }

  & .corner-bl {
    bottom: 0;
    left: 0;
    border-right: 0;
    border-top: 0;
  }

  & .corner-br {
    bottom: 0;
    right: 0;
    border-left: 0;
    border-top: 0;
  }

  & .text {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    font-size: ${theme.typography.sizes.md};
  }

  & .dev {
    color: ${theme.colors.text.base};
    font-weight: ${theme.typography.weights.medium};
  }

  & .exp {
    color: ${theme.colors.accent.base};
    font-weight: ${theme.typography.weights.medium};
  }
`;

const DevExpHeroContainer = styled.div /*css*/`
  & {
    position: relative;
    display: inline-flex;
    width: fit-content;
    padding: 2rem;
    margin-bottom: 2rem;
    font-family: ${theme.typography.fonts.mono};
  }

  & .corner {
    position: absolute;
    width: 30px;
    height: 30px;
    border: 2px solid ${theme.colors.accent.base};
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  & .corner-tl { top: 0; left: 0; border-right: 0; border-bottom: 0; }
  & .corner-tr { top: 0; right: 0; border-left: 0; border-bottom: 0; }
  & .corner-bl { bottom: 0; left: 0; border-right: 0; border-top: 0; }
  & .corner-br { bottom: 0; right: 0; border-left: 0; border-top: 0; }

  & .text {
    display: flex;
    font-size: 5rem;
    font-weight: ${theme.typography.weights.bold};
  }

  & .dev {
    background: linear-gradient(45deg, ${theme.colors.text.base}, ${theme.colors.text.dimmed});
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  & .exp {
    color: ${theme.colors.accent.base};
    opacity: 0.9;
  }

  @media (max-width: 1024px) {
    & .text {
      font-size: 4rem;
    }
  }

  @media (max-width: 640px) {
    & .text {
      font-size: 3rem;
    }
  }
`;

const ReDocsContainer = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.md};
    user-select: none;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
  }

  & .bracket {
    color: ${theme.colors.info.base};
    opacity: 0.9;
  }

  & .name {
    color: ${theme.colors.text.base};
    font-weight: ${theme.typography.weights.medium};
  }

  & .type {
    color: ${theme.colors.accent.base};
    font-weight: ${theme.typography.weights.medium};
  }
`;

export const RefaceIcon = component((props: { size?: "default" | "large" }) => (
  <RefaceIconContainer class={`size-${props.size || "default"}`}>
    R
  </RefaceIconContainer>
));

export const RefaceGroup = component((
  props: { size?: "default" | "large" },
) => (
  <RefaceGroupContainer>
    <RefaceIconContainer class={`size-${props.size || "default"}`}>
      R
    </RefaceIconContainer>
    <RefaceTextContainer>
      <span class="brand-name">Reface</span>
      <span class="brand-tagline">UI Framework</span>
    </RefaceTextContainer>
  </RefaceGroupContainer>
));

export const RefaceHero = component(() => (
  <RefaceHeroContainer>
    <RefaceHeroSquare>R</RefaceHeroSquare>
    <RefaceHeroText>eface</RefaceHeroText>
  </RefaceHeroContainer>
));

export const RefaceUILogo = component(() => (
  <RefaceUIContainer>
    <span class="bracket">[</span>
    <span class="letter">R</span>
    <span class="bracket">]</span>
    <span class="name">eface</span>
    <span class="type">UI</span>
  </RefaceUIContainer>
));

export const ReStoryLogo = component(() => (
  <ReStoryContainer>
    <span class="bracket">{`{`}</span>
    <span class="name">Re</span>
    <span class="type">Story</span>
    <span class="bracket">{`}`}</span>
  </ReStoryContainer>
));

export const ReCastLogo = component(() => (
  <ReCastContainer>
    <span class="re">Re</span>
    <span class="backtick">`</span>
    <span class="cast">Cast</span>
    <span class="backtick">`</span>
  </ReCastContainer>
));

export const DevExpLogo = component(() => (
  <DevExpContainer>
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="text">
      <span class="dev">Dev</span>
      <span class="exp">Exp</span>
    </div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>
  </DevExpContainer>
));

export const DevExpHeroLogo = component(() => (
  <DevExpHeroContainer>
    <div class="corner corner-tl"></div>
    <div class="corner corner-tr"></div>
    <div class="text">
      <span class="dev">Dev</span>
      <span class="exp">Exp</span>
    </div>
    <div class="corner corner-bl"></div>
    <div class="corner corner-br"></div>
  </DevExpHeroContainer>
));

export const ReDocsLogo = component(() => (
  <ReDocsContainer>
    <span class="bracket">📚</span>
    <span class="name">Re</span>
    <span class="type">Docs</span>
  </ReDocsContainer>
));
