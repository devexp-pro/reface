import { type Child, component, styled } from "@recast";
import { theme } from "../theme.ts";

const StyledButton = styled.button`
  & {
    height: 24px;
    padding: 0 ${theme.spacing.sm};
    background: ${theme.colors.bg.input};
    border: none;
    border-radius: 4px;
    color: ${theme.colors.text.base};
    font-family: ${theme.typography.fonts.ui};
    font-size: ${theme.typography.sizes.xs};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
  }

  &.block {
    width: 100%;
    justify-content: center;
  }

  &:hover {
    background: ${theme.colors.bg.hover};
  }

  &.primary {
    background: ${theme.colors.accent.base};
    border-color: ${theme.colors.accent.base};
    color: white;
  }

  &.primary:hover {
    background: ${theme.colors.accent.hover};
  }

  &.active {
    background: ${theme.colors.accent.base};
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;

type ButtonProps = {
  variant?: "default" | "primary";
  active?: boolean;
  disabled?: boolean;
  block?: boolean;
  slots?: {
    start?: Child;
    end?: Child;
  };
};

export const Button = component((props: ButtonProps, children) => (
  <StyledButton
    class={[
      props.variant,
      props.active && "active",
      props.block && "block",
    ].filter(Boolean).join(" ")}
    disabled={props.disabled}
  >
    {props.slots?.start}
    {children}
    {props.slots?.end}
  </StyledButton>
));
