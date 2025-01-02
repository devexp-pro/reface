import { component, styled } from "@reface/recast";
import { BodyEndSlot, Template } from "@reface/recast/slots";
import { Icon, theme } from "@reface/ui";

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

  &[data-collapsed="true"] .panel-content,
  &[data-collapsed="true"] .panel-footer {
    display: none;
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
  }

  .variant-light & {
    background: ${theme.colors.surface.base};
  }

  .variant-dark & {
    background: ${theme.colors.surface.base};
  }

  & .collapse-icon {
    color: ${theme.colors.text.dimmed};
    transition: transform 0.2s;
  }

  &[data-collapsed="true"] .collapse-icon {
    transform: rotate(-90deg);
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
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  slots?: {
    header?: JSX.Element;
    footer?: JSX.Element;
  };
};

const clientScript = /*js*/ `
  document.querySelectorAll('[data-component="Panel"][data-collapsible="true"] .panel-header').forEach(header => {
    header.addEventListener('click', () => {
      const panel = header.closest('.panel');
      const isCollapsed = panel.getAttribute('data-collapsed') === 'true';
      panel.setAttribute('data-collapsed', !isCollapsed);
    });
  });
`;

export const Panel = component((
  { variant = "base", slots, collapsible, defaultCollapsed = false, ...attrs }:
    PanelProps,
  children,
) => (
  <StyledPanel
    {...attrs}
    class={["panel", `variant-${variant}`]}
    data-component="Panel"
    data-collapsible={collapsible}
    data-collapsed={defaultCollapsed}
  >
    {(slots?.header || collapsible) && (
      <PanelHeader class="panel-header">
        {slots?.header}
        {collapsible && (
          <Icon name="caret-down" class="collapse-icon" size="sm" />
        )}
      </PanelHeader>
    )}
    <PanelContent class="panel-content">{children}</PanelContent>
    {slots?.footer && (
      <PanelFooter class="panel-footer">{slots.footer}</PanelFooter>
    )}
    <Template slot={BodyEndSlot.getSlot()} key="panel-script">
      <script>{clientScript}</script>
    </Template>
  </StyledPanel>
));
