import { component, styled } from "@reface/recast";
import { theme } from "../theme.ts";
import { Stack } from "../layout/Stack.tsx";
import { Grid, GridCol } from "../layout/Grid.tsx";
import {
  DevExpHeroLogo,
  DevExpLogo,
  ReDocsLogo,
  RefaceGroup,
  RefaceHero,
  RefaceIcon,
  RefaceUILogo,
  ReForgeLogo,
  ReStoryLogo,
} from "./Logo.tsx";

export const meta = {
  title: "Reface/Logo",
  description: "Logo components for Reface ecosystem",
};

const LogoGrid = styled.div /*css*/`
  & {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: ${theme.spacing.lg};
    align-items: center;
    padding: ${theme.spacing.lg};
    border: 1px solid ${theme.colors.border.base};
    border-radius: 4px;
  }

  & .title {
    color: ${theme.colors.text.dimmed};
    font-size: ${theme.typography.sizes.sm};
    font-family: ${theme.typography.fonts.mono};
  }
`;

const SectionTitle = styled.h2 /*css*/`
  & {
    font-size: ${theme.typography.sizes.lg};
    color: ${theme.colors.text.base};
    margin-bottom: ${theme.spacing.lg};
    font-weight: ${theme.typography.weights.medium};
  }
`;

export const RefaceBranding = component(() => (
  <Stack direction="vertical" gap="xl">
    <SectionTitle>Reface Brand</SectionTitle>
    <Stack direction="vertical" gap="lg">
      <LogoGrid>
        <RefaceIcon size="large" />
        <div class="title">Default Square Icon</div>
      </LogoGrid>
      <LogoGrid>
        <RefaceGroup />
        <div class="title">Full Brand Logo with Tagline</div>
      </LogoGrid>
      <LogoGrid>
        <RefaceHero />
        <div class="title">Hero Version with Animation</div>
      </LogoGrid>
    </Stack>
  </Stack>
));

export const DevExpBranding = component(() => (
  <Stack direction="vertical" gap="xl">
    <SectionTitle>DevExp Brand</SectionTitle>
    <Stack direction="vertical" gap="lg">
      <LogoGrid>
        <DevExpLogo />
        <div class="title">Default DevExp Logo</div>
      </LogoGrid>
      <LogoGrid>
        <DevExpHeroLogo />
        <div class="title">Hero Version with Animated Corners</div>
      </LogoGrid>
    </Stack>
  </Stack>
));

export const RefacePackages = component(() => (
  <Stack direction="vertical" gap="xl">
    <SectionTitle>Reface Packages</SectionTitle>
    <Stack direction="vertical" gap="lg">
      <LogoGrid>
        <RefaceUILogo />
        <div class="title">Reface UI - Core Component Library</div>
      </LogoGrid>
      <LogoGrid>
        <ReStoryLogo />
        <div class="title">ReStory - Component Development Environment</div>
      </LogoGrid>
      <LogoGrid>
        <ReForgeLogo />
        <div class="title">ReForge - Build System</div>
      </LogoGrid>
      <LogoGrid>
        <ReDocsLogo />
        <div class="title">ReDocs - Documentation System</div>
      </LogoGrid>
    </Stack>
  </Stack>
));
