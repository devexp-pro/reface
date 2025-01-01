import { component, styled } from "@reface/recast";
import { theme } from "../theme.ts";

type PanelVariant = "base" | "light" | "dark";

const StyledPanel = styled.div /*css*/`
  & {
    background: ${theme.colors.surface.base};
    border: 1px solid ${theme.colors.border.base};
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &.variant-light {
    background: ${theme.colors.surface.light};
    border-color: ${theme.colors.border.light};
  }

  &.variant-dark {
    background: ${theme.colors.surface.dark};
    border-color: ${theme.colors.border.dark};
  }

  .stack-vertical.no-gap > & + & {
    border-top: none;
  }

  .stack-horizontal.no-gap > & + & {
    border-left: none;
  }
`;

const PanelHeader = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    background: ${theme.colors.bg.input};
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.sm};
    font-weight: ${theme.typography.weights.medium};
  }

  .variant-light & {
    background: ${theme.colors.surface.base};
  }

  .variant-dark & {
    background: ${theme.colors.surface.base};
  }
`;

const PanelContent = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    flex: 1;
    overflow: auto;
  }
`;

const PanelFooter = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    background: ${theme.colors.bg.input};
  }

  .variant-light & {
    background: ${theme.colors.surface.base};
  }

  .variant-dark & {
    background: ${theme.colors.surface.base};
  }
`;

type PanelProps = {
  variant?: PanelVariant;
  children: JSX.Element;
  slots?: {
    header?: JSX.Element;
    footer?: JSX.Element;
  };
};

export const Panel = component((
  { variant = "base", slots, ...attrs }: PanelProps,
  children,
) => (
  <StyledPanel {...attrs} class={[`variant-${variant}`]}>
    {slots?.header && <PanelHeader>{slots.header}</PanelHeader>}
    <PanelContent>{children}</PanelContent>
    {slots?.footer && <PanelFooter>{slots.footer}</PanelFooter>}
  </StyledPanel>
));
