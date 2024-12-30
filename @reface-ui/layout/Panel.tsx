import { component } from "@reface";
import { styled } from "@reface/plugins/styled";
import { theme } from "../theme.ts";

const StyledPanel = styled.div`
  & {
    background: ${theme.colors.bg.panel};
    border: 1px solid ${theme.colors.border.base};
    border-radius: 6px;
    overflow: hidden;
  }
`;

const PanelHeader = styled.div`
  & {
    padding: ${theme.spacing.md};
    border-bottom: 1px solid ${theme.colors.border.base};
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.sm};
    font-weight: ${theme.typography.weights.medium};
  }
`;

const PanelContent = styled.div`
  & {
    padding: ${theme.spacing.md};
  }
`;

const PanelFooter = styled.div`
  & {
    padding: ${theme.spacing.md};
    border-top: 1px solid ${theme.colors.border.base};
    background: ${theme.colors.bg.panel};
  }
`;

type PanelProps = {
  children: JSX.Element;
  slots?: {
    header?: JSX.Element;
    footer?: JSX.Element;
  };
};

export const Panel = component(({ slots, ...attrs }: PanelProps, children) => (
  <StyledPanel {...attrs}>
    {slots?.header && <PanelHeader>{slots.header}</PanelHeader>}
    <PanelContent>{children}</PanelContent>
    {slots?.footer && <PanelFooter>{slots.footer}</PanelFooter>}
  </StyledPanel>
));
