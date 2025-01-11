import { type Child, component, styled } from "@recast";
import { BodyEndSlot, Template as SlotTemplate } from "@recast/slots";
import { Icon, theme } from "@reface-ui";
import { HTMLAttributes } from "@recast/expressions";

type PanelVariant = "base" | "light" | "dark";

const StyledPanel = styled.div /*css*/`
  & {
    background: ${theme.colors.surface.base};
    border: 1px solid ${theme.colors.border.base};
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  & .panel-content,
  & .panel-footer {
    overflow: hidden;
    max-height: var(--panel-max-height, 2000px);
    transition: all 0.3s ease-out;
  }

  &[data-collapsed="true"] .panel-content,
  &[data-collapsed="true"] .panel-footer {
    max-height: 0;
    padding: 0;
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
    transition: transform 0.3s ease;
  }

  [data-collapsed="true"] & .collapse-icon {
    transform: rotate(-180deg);
  }
`;

const PanelContent = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    flex: 1;
    overflow: auto;
    transition: all 0.3s ease-out;
  }
`;

const PanelFooter = styled.div /*css*/`
  & {
    padding: ${theme.spacing.md};
    background: ${theme.colors.bg.input};
    transition: padding 0.3s ease-out;
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
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  slots?: {
    header?: Child;
    footer?: Child;
  };
} & HTMLAttributes;

const clientScript = /*js*/ `
  (() => {
    const componentId = document.currentScript.getAttribute('data-component');
    if (!componentId) return;

    document.addEventListener('click', (e) => {
      const header = e.target.closest('[__rcc*="' + componentId + '"][data-collapsible="true"] .panel-header');
      if (header) {
        const panel = header.closest('.panel');
        panel.setAttribute('data-collapsed', panel.getAttribute('data-collapsed') !== 'true');
      }
    });
  })();
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
    <SlotTemplate slot={BodyEndSlot.getSlot()} key="panel-script">
      <script>{clientScript}</script>
    </SlotTemplate>
  </StyledPanel>
));
