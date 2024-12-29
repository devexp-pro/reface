import { component, styled } from "@recast";
import { theme } from "@reface-ui";

const StyledSlot = styled.div /*css*/`
  & {
    border: 2px dashed ${theme.colors.accent.base};
    border-radius: 4px;
    padding: ${theme.spacing.lg};
    color: ${theme.colors.text.dimmed};
    font-family: ${theme.typography.fonts.mono};
    font-size: ${theme.typography.sizes.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    position: relative;
  }

  & .label {
    position: absolute;
    top: -${theme.spacing.xs};
    left: ${theme.spacing.sm};
    background: ${theme.colors.bg.base};
    padding: 0 ${theme.spacing.xs};
    font-size: ${theme.typography.sizes.xs};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${theme.colors.accent.muted};
  }
`;

type StorySlotProps = {
  name: string;
  class?: string;
};

export const StorySlot = component((props: StorySlotProps, children) => (
  <StyledSlot class={props.class}>
    <div class="label">{props.name}</div>
    {children || `<${props.name}>`}
  </StyledSlot>
));
