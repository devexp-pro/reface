import { component } from "@reface";
import { Stack } from "../layout/Stack.tsx";
import { styled } from "@reface/plugins/styled";
import {
  RefaceGroup,
  RefaceHero,
  RefaceIcon,
  RefaceUILogo,
  ReStoryLogo,
  ReTemplateLogo,
} from "./Logo.tsx";

export const meta = {
  title: "Reface/Logo",
  description: "Logo components for Reface ecosystem",
};

const LogoWrapper = styled.div /*css*/`
  & {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  & .description {
    font-size: 0.875rem;
    color: var(--text-dimmed);
  }
`;

export const All = component(() => (
  <Stack direction="vertical" gap="lg">
    <LogoWrapper>
      <RefaceIcon />
      <div class="description">RefaceIcon - Square icon with "R"</div>
    </LogoWrapper>

    <LogoWrapper>
      <RefaceGroup />
      <div class="description">
        RefaceGroup - Icon with full brand name and tagline
      </div>
    </LogoWrapper>

    <LogoWrapper>
      <RefaceHero />
      <div class="description">RefaceHero - Large animated hero version</div>
    </LogoWrapper>

    <LogoWrapper>
      <RefaceUILogo />
      <div class="description">RefaceUILogo - [R]eface UI branding</div>
    </LogoWrapper>

    <LogoWrapper>
      <ReStoryLogo />
      <div class="description">ReStoryLogo - {"{Re}"}Story branding</div>
    </LogoWrapper>

    <LogoWrapper>
      <ReTemplateLogo />
      <div class="description">
        ReTemplateLogo - &lt;Re template/&gt; branding
      </div>
    </LogoWrapper>
  </Stack>
));

export const RefaceVariants = component(() => (
  <Stack direction="vertical" gap="lg">
    <LogoWrapper>
      <RefaceIcon size="default" />
      <div class="description">Default size icon</div>
    </LogoWrapper>

    <LogoWrapper>
      <RefaceIcon size="large" />
      <div class="description">Large size icon</div>
    </LogoWrapper>

    <LogoWrapper>
      <RefaceGroup size="default" />
      <div class="description">Default size group</div>
    </LogoWrapper>

    <LogoWrapper>
      <RefaceGroup size="large" />
      <div class="description">Large size group</div>
    </LogoWrapper>

    <LogoWrapper>
      <RefaceHero />
      <div class="description">Hero version with animation</div>
    </LogoWrapper>
  </Stack>
));
